const mongoose = require("mongoose");
const config = require("config");
const mongo = config.get("mongoUrl");

const connectMongo = async () => {
  try {
    await mongoose.connect(mongo, {
      useNewURLParser: true,
    });

    console.log("Complain will be Uploaded");
  } catch {
    (err) => {
      console.log(err.message);
      process.exit(1);
    };
  }
};

module.exports = connectMongo;
