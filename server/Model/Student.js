const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: {
      type: Array,
      default: [],
    },
    currentLevel: {
      type: Number,
      require: true,
    },
    conversations: {
      type: Array,
      default: [],
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);
