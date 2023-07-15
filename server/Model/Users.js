const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    userName: {
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
    accountType: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    courses: {
      type: Array,
      default: [],
    },
    conversations: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", AdminSchema);
