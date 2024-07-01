import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Message from "../layout/Message";
import StudentMessaages from "../layout/StudentMessages";
import AuthContext from "../../Context/authContext/AuthContext";
import { axiosInstance } from "../../base";

const Course = () => {
  const { user, loadUser, error } = useContext(AuthContext);
  const [course, setCourse] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const getCourseById = async () => {
    try {
      const res = await axiosInstance.get(`/api/courses/course/${id}`, {
        headers: {
          authorize: localStorage.getItem("token"),
        },
      });
      setCourse(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    if (!user) loadUser();
    if (error && error === "Authorization Failed") navigate("/signin");
  }, [user, error]);

  useEffect(() => {
    getCourseById();
  }, []);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div>
        {course ? (
          <div className="mb-3 p-2">
            <div className="course_top">
              <div className="name text-3xl font-bold">
                Course Code :<span className="font-reos">{course.code}</span>
              </div>
              <div className="name text-xl">Course Title :{course.title}</div>
              <div className="name text-xl">Lecturer :{course.lecturer}</div>
            </div>
            <div className="main_course grid grid-cols-2">
              {/* <Message /> */}
              {/* <StudentMessaages /> */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Course;
