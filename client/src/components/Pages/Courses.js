import { useContext } from "react";
import CourseContext from "../../Context/courseContext/CourseContext";

const Courses = (prop) => {
  const courseCon = useContext(CourseContext);
  const { courses } = courseCon;
  return (
    <div>
      <div>This is the Courses Page</div>
      <div>
        {courses.map((course) => (
          <div>{course.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
