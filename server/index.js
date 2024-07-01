const express = require("express");
const cors = require("cors");
const myApp = express();
require("dotenv").config();

const connectMongo = require("./config/Mongoose");

myApp.use(cors());
connectMongo();

myApp.use(express.json({ extended: false }));

myApp.use("/api/courses", require("./routes/courses"));
myApp.use("/api/auth", require("./routes/auth"));
myApp.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 3200;
myApp.listen(PORT, () => console.log(`Server connected on Port ${PORT}`));
