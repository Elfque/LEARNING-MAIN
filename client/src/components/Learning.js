import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import AlertState from "../Context/alertContext/AlertState";
import CourseState from "../Context/courseContext/CourseState";
import Courses from "./Pages/Courses";
import Course from "./Pages/Course";
import AuthState from "../Context/authContext/AuthState";

const Learning = () => {
  return (
    <AuthState>
      <CourseState>
        <AlertState>
          <Router>
            <div>
              <Routes>
                <Route path="/signup" element={<Register />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<Course />} />
              </Routes>
            </div>
          </Router>
        </AlertState>
      </CourseState>
    </AuthState>
  );
};

export default Learning;
