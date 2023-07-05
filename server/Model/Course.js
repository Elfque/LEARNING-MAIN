const mongoose = require("mongoose");

// const studentSchema = mongoose.Schema({
//   name: {
//     type: String,
//     require: true,
//   },
//   id: {
//     type: String,
//     require: true,
//   },
//   grade: {
//     CA: {
//       type: Number,
//     },
//     Examination: {
//       type: Number,
//     },
//   },
// });

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
