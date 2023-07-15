const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      require: true,
    },
    students: {
      type: Array,
      default: [],
    },
    lecturer: {
      type: String,
      require: true,
    },
    level: {
      type: Number,
      require: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", UserSchema);
