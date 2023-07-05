const myToken = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  const token = req.headers.authorize;

  if (!token) return res.status(401).json({ msg: "Authorization required" });

  try {
    const decoded = myToken.verify(token, config.get("secret"));

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Authorization Failed" });
  }
};
