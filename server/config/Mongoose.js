const mongoose = require("mongoose");
require("config");
// const mongo = config.get("mongoUrl");

const url = "mongodb+srv://faruqadeyemi70:khalif@cluster0.rg5ggxp.mongodb.net/";

const connectMongo = async () => {
  console.log("Connecting", process.env.secret);
  try {
    await mongoose.connect(url, {
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
