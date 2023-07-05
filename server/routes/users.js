const bcrypt = require("bcryptjs");
const express = require("express");
const token = require("jsonwebtoken");
const config = require("config");
const myDb = config.get("secret");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../Model/Users");

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // create folder with user ID
    const userId = req.user._id;
    const folderPath = `uploads/${userId}`;
    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// REGISTER USER
router.post(
  "/",
  [
    check("email", "Please provide an email").isEmail(),
    check("password", "Password cannot be less than 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userName, accountType } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        email,
        password,
        userName,
        accountType,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();

      res.status(201).json({ msg: "Success" });

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
  }
);

module.exports = router;
