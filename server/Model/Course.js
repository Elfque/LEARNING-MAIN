const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    students: {
      type: Array,
      default: [],
    },
    teacher: {
      type: String,
      require: true,
    },
    level: {
      type: Number,
      require: true,
    },
    materials: {
      type: Array,
      default: [],
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", UserSchema);
