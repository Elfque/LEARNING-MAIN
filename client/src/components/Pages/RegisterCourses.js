import axios from "axios";
import Navbar from "../layout/Navbar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/authContext/AuthContext";
import AlertContext from "../../Context/alertContext/AlertContext";
import { useNavigate } from "react-router-dom";
import Alert from "../layout/Alert";
import { axiosInstance } from "../../base";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorize: localStorage.getItem("token"),
  },
});

const RegisterCourse = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [registering, setRegistering] = useState(false);

  const { addAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      const res = await axiosInstance.get(`/api/courses/${user.currentLevel}`, {
        headers: {
          authorize: localStorage.getItem("token"),
        },
      });
      setCourses(res.data);
    } catch (error) {
      if (error.response.data.msg === "Authorization Failed")
        navigate("/signin");
      console.log(error.response);
    }
  };

  const selecting = (course) => {
    if (selected.includes(course)) {
      setSelected((prevSelected) =>
        prevSelected.filter((cou) => cou !== course)
      );
    } else {
      setSelected([...selected, course]);
    }
  };

  const registerCourse = async () => {
    setRegistering(true);
    try {
      const res = await axiosInstance.patch("/api/courses/register", {
        course: selected,
      });
      // addAlert("Courses Successfully registered", "good");
      navigate("/courses");

      setRegistering(false);
    } catch (error) {
      console.log(error.response);
      addAlert(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (!user) {
      loadUser();
    } else {
      getCourses();
    }
  }, [user]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="p-2">
        <div className="text-2xl">Register Your Courses</div>
        <div>This are the list of courses for you</div>
        <Alert />
        <div className="grid grid-cols-10 text-sm w-4/5 mx-auto my-2 bg-blue-700 text-white py-2 rounded-t-3xl">
          <div className="text-center">No</div>
          <div className="col-span-2">Course Code</div>
          <div className="col-span-5">Course Title</div>
          <div className="">Type</div>
        </div>

        {courses?.map((cou) => (
          <div
            key={cou._id}
            className="grid grid-cols-10 text-sm w-4/5 mx-auto my-2"
          >
            <div className="text-center">
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => selecting(cou)}
                checked={selected.includes(cou)}
              />
            </div>
            <div className="col-span-2">{cou.code}</div>
            <div className="col-span-5 w-5/6 truncate">{cou.title}</div>
            <div className="uppercase">{cou.type ? cou.type[0] : "N/A"}</div>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={registerCourse}
            className="bg-bluish text-white font-semibold mt-4 rounded-full w-32"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCourse;
