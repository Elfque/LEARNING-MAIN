import { Link } from "react-router-dom";

const CourseList = ({ course }) => {
  return (
    <Link to={`course/${course.id}`} className="course">
      <div className="p-4">
        <div className=" text-2xl font-semibold">{course.title}</div>
        <div className="text-sm mt-4">
          Lecturer : <span>{course.creator}</span>
        </div>
        {/* <button className="border border-gray-500 py-1 rounded-md mt-2 px-4 text-sm font-semibold">
          Go to Course
        </button> */}
      </div>
    </Link>
  );
};

export default CourseList;
