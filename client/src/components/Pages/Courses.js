import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../Context/authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CourseList from "../layout/CourseList";
import Navbar from "../layout/Navbar";
import { axiosInstance } from "../../base";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    authorize: localStorage.getItem("token"),
  },
});

const Courses = () => {
  const { user, error, loadUser } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);

  const getUserCourses = async () => {
    try {
      const res = await axiosInstance.get("/api/courses");
      setCourses(
        res.data.find((cour) => cour.level === user.currentLevel).courses
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    if (!user) loadUser();
    if (error && error === "Authorization Failed") navigate("/signin");

    user && getUserCourses();
  }, [user, error]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="p-2">
        <div className="text-2xl font-semibold">Courses Page</div>
        <div className="mb-4 text-gray-600">List of courses you are taking</div>
        <div>
          <div className="grid grid-cols-courseGrid gap-4">
            {courses?.map((course, idx) => (
              <Link to={`/course/${course._id}`} key={idx}>
                <div className="p-4 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">
                  <div className="text-3xl">{course.code}</div>
                  <div className="">{course.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
