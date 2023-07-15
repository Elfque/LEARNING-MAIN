import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../Context/authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CourseList from "../layout/CourseList";
import Navbar from "../layout/Navbar";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    authorize: localStorage.getItem("token"),
  },
});

const Courses = () => {
  const { user, error, loadUser } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);

  // const getUserCourses = async () => {
  //   try {
  //     const res = instance.get("/api/courses/registered");
  //     console.log(res.data);
  //     setCourses(res.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    if (!user) loadUser();
    if (error && error === "Authorization Failed") navigate("/signin");

    if (user) {
      console.log(user);
      setCourses(
        user?.courses?.find((course) => course.level === user.currentLevel)
          .courses
      );
    }
  }, [user]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="p-2">
        <div className="text-2xl font-semibold">Courses Page</div>
        <div className="mb-4 text-gray-600">List of courses you are taking</div>
        <div>
          <div className="grid grid-cols-courseGrid">
            {courses?.map((course) => (
              <Link to={`/course/${course._id}`}>
                <div>
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
