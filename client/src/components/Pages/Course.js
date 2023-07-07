import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseContext from "../../Context/courseContext/CourseContext";
import Navbar from "../layout/Navbar";
import Message from "../layout/Message";
import StudentMessaages from "../layout/StudentMessages";

const Course = () => {
  const courseCon = useContext(CourseContext);
  const { getCourse, course } = courseCon;

  const { id } = useParams();

  useEffect(() => {
    getCourse(id);
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      <Navbar />
      {course ? (
        <div className="mt-4 mb-3">
          <div className="course_top">
            <div className="name text-3xl">{course.name}</div>
          </div>
          <div className="main_course grid grid-cols-2">
            <Message />
            <StudentMessaages />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Course;
