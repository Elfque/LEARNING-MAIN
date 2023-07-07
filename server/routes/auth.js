const express = require("express");
const router = express.Router();
const User = require("../Model/Users");
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
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid Email Address" });

      const compPass = await bcrypt.compare(password, user.password);

      if (!compPass) return res.status(400).json({ msg: "Invalid Password" });

      const token = jwt.sign({ id: user.id }, process.env.secret, {
        expiresIn: "1d",
      });

      delete user.password;
      res.status(200).json({ msg: "Success", token, user });
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
    let user = await User.findById(id);

    user.password = "";
    // const {accou ntTy}
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
