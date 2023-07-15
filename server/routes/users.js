const bcrypt = require("bcryptjs");
const express = require("express");
const token = require("jsonwebtoken");
const path = require("path");
const middle = require("../middleware/middle");

const router = express.Router();
// const { check, validationResult } = require("express-validator");
const Student = require("../Model/Student");
const User = require("../Model/Users");

// REGISTER USER
router.post("/", async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    currentLevel,
    faculty,
    department,
  } = req.body;

  try {
    let user = await Student.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new Student({
      email,
      password,
      first_name,
      last_name,
      currentLevel,
      faculty,
      department,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    res.status(201).json({ msg: "Success", savedUser });

    // const myPayload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // token.sign({ id: user.id }, myDb, { expiresIn: 36000 }, (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.post("/message", middle, async (req, res) => {
  const { text, destination } = req.body;
  const { id } = req.user;

  try {
    let user = await User.findById(destination);
    let student = await Student.findById(id);

    let convo = user.conversations.find((conv) => conv.id === id);
    const studentConvo = student.conversations.find(
      (conv) => conv.id === destination
    );

    if (convo) {
      user.conversations = user.conversations.map((conv) => {
        if (conv.id === id) {
          return {
            ...conv,
            time: new Date(),
            responded: false,
            messages: [
              ...conv.messages,
              { sender: id, text: text, time: new Date() },
            ],
          };
        } else {
          return conv;
        }
      });
    } else {
      user.conversations = [
        ...user.conversations,
        {
          id: id,
          name: `${user.first_name} ${user.last_name}`,
          time: new Date(),
          responded: false,
          messages: [{ sender: id, text: text, time: new Date() }],
        },
      ];
    }

    if (studentConvo) {
      student.conversations = student.conversations.map((conv) => {
        if (conv.id === destination) {
          return {
            ...conv,
            time: new Date(),
            responded: true,
            messages: [
              ...conv.messages,
              { sender: id, text: text, time: new Date() },
            ],
          };
        } else {
          return conv;
        }
      });
    } else {
      student.conversations = [
        ...student.conversations,
        {
          id: destination,
          name: user.userName,
          time: new Date(),
          responded: true,
          messages: [{ sender: id, text: text, time: new Date() }],
        },
      ];
    }

    await user.save();
    await student.save();

    const newConvo = student.conversations.find(
      (conv) => conv.id === destination
    );

    res.send(newConvo);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
