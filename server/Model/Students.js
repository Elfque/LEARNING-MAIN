const mongoose = require("mongoose");

const UpdatedStudentSchema = mongoose.Schema(
  {
    name: {
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
      type: Object,
      default: {},
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

module.exports = mongoose.model("students", UpdatedStudentSchema);
