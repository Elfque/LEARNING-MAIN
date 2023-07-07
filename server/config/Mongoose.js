const mongoose = require("mongoose");
const config = require("config");
const mongo = config.get("mongoUrl");

const connectMongo = async () => {
  try {
    await mongoose.connect(mongo, {
      useNewURLParser: true,
    });

    console.log("Database Connected");
  } catch {
    (err) => {
      console.log(err);
      process.exit(1);
    };
  }
};

module.exports = connectMongo;
