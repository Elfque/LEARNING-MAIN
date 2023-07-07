const express = require("express");
const router = express.Router();
const Student = require("../Model/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const middle = require("../middleware/middle");

router.post(
  "/",

  async (req, res) => {
    // res.send("LOGGING IN");
    const { email, password } = req.body;

    try {
      let student = await Student.findOne({ email });

      if (!student)
        return res.status(400).json({ msg: "Invalid Email Address" });

      const compPass = await bcrypt.compare(password, student.password);

      if (!compPass) return res.status(400).json({ msg: "Invalid Password" });

      const token = jwt.sign({ id: student.id }, process.env.secret, {
        expiresIn: "1d",
      });

      delete student.password;
      res.status(200).json({ msg: "Success", token, student });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error");
    }
  }
);

// GET USER
router.get("/", middle, async (req, res) => {
  try {
    const { id } = req.user;
    let user = await Student.findById(id);

    user.password = "";
    // const {accou ntTy}
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
