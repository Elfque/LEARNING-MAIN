const express = require("express");
// const { check, validationResult } = require("express-validator");
const middle = require("../middleware/middle");
const Course = require("../Model/Course");
const Student = require("../Model/Student");

const router = express.Router();

// CREATING COURSES
router.post("/", middle, async (req, res) => {
  const { id } = req.user.id;

  const { name, student, messages, materials } = req.body;

  try {
    let user = User.findById(id);

    let course = new Course({
      name,
      student,
      messages,
      materials,
      teacher: id,
      level: 100,
    });

    const savedCourse = await course.save();

    res.json({ savedCourse });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GETTING COURSES
router.get("/", middle, async (req, res) => {
  const { id } = req.user;

  try {
    const student = await Student.findById(id);

    res.send(student.courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:level", middle, async (req, res) => {
  const { level } = req.params;

  try {
    let courses = await Course.find({ level: level });

    courses = courses.map(({ title, code, type, _id, lecturer }) => {
      return { title, code, type, _id, lecturer };
    });

    res.send(courses);
  } catch (error) {}
});

// REGISTERIG COURSES
router.patch("/register", middle, async (req, res) => {
  const { id } = req.user;
  const { course } = req.body;

  try {
    let user = await Student.findById(id);

    const userCourses = user.courses.find(
      (course) => course.level === user.currentLevel
    );

    if (userCourses && userCourses.registered)
      return res.status(400).json({ msg: "You Already Registered" });

    const newCourse = [
      ...user.courses,
      { registered: true, courses: course, level: user.currentLevel },
    ];

    const courses = course.map((cou) => Course.findById(cou._id));

    const addTo = await Promise.all(courses);

    const newCourses = addTo.map(async (add) => {
      const newStudents = [
        ...add.students,
        {
          name: `${user.first_name} ${user.last_name}`,
          id: id,
          grade: {
            CA: 0,
            Examination: 0,
          },
        },
      ];

      add.students = newStudents;

      await add.save();
    });

    user.courses = newCourse;

    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/registered", middle, async (req, res) => {
  const { id } = req.user;

  try {
    let user = await Student.findById(id);

    res.send(user.courses);
  } catch (error) {
    console.log(error.message);
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

// ADD AND REMOVE STUDENT
router.get("/course/:courseId", middle, async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    res.send(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/message", middle, async (req, res) => {
  const { courseId, text } = req.body;
  const { id } = req.user;

  try {
    const course = await Course.findById(courseId);

    course.messages = [
      ...course.messages,
      { text, time: new Date(), sender: id },
    ];

    res.send(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
