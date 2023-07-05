const express = require("express");
const { check, validationResult } = require("express-validator");
const middle = require("../middleware/middle");
const Course = require("../Model/Course");
const User = require("../Model/Users");

const router = express.Router();

// ADDING COURSES
router.post(
  "/",
  middle,
  [check("name", "Course Name cannot be empty").not().isEmpty()],
  async (req, res) => {
    const { id } = req.user.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, student, messages, materials } = req.body;

    try {
      let user = User.findById(id);
      let course = new Course({
        name,
        student,
        messages,
        materials,
        courseOwner: id,
        teacher: user.userName,
      });

      const savedCourse = await course.save();

      res.json({ savedCourse });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// GETTING COURSES
router.get("/", middle, async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    const courses = await Promise.all(
      user.courses.map((id) => Course.findById(id))
    );

    res.send(courses);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ADD AND REMOVE STUDENT
router.patch("/:courseId", middle, async (req, res) => {
  const { id, courseId } = req.user;

  try {
    const course = await Course.findById(courseId);
    const user = await User.findById(id);

    if (course.students.includes(id)) {
      course.students = course.students.filter((stud) => stud != id);
      user.courses = user.courses.filter((cour) => cour != courseId);
    } else {
      course.students = [...course.students, id];
      user.courses = [...user.courses, course];
    }

    await user.save();
    await course.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
