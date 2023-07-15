import { useContext, useState } from "react";
import CourseContext from "../../Context/courseContext/CourseContext";
import Navbar from "../layout/Navbar";
import CourseList from "../layout/CourseList";
import { FaTimes } from "react-icons/fa";

const StudentHome = () => {
  const courseCon = useContext(CourseContext);
  const { courses } = courseCon;

  return (
    <div>
      <Navbar />
      <div className="grid gap-4 mt-6 grid-cols-courseGrid">
        {courses.map((course) => (
          <CourseList key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
