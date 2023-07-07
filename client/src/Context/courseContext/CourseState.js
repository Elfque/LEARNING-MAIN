import { useReducer } from "react";
import CourseContext from "./CourseContext";
import CourseReducer from "./CourseReducer";
// import { v4 } from "uuid";
import axios from "axios";
import { DELETE_COURSE, EDIT_COURSE, GET_COURSES, GET_COURSE } from "../type";

const CourseState = (prop) => {
  const myName = "John Doe";
  const initialState = {
    courses: [
      {
        id: 1,
        name: "CSC 425",
        creator: "Mrs Aderoju",
        material: [],
        cover: "img/1.jpg",
        students: [
          {
            id: "bhvfnht",
            name: "Aderoju Faruq",
            grades: {
              CA: "_",
            },
          },
        ],
      },
      {
        id: 2,
        name: "CSC 495",
        creator: "Mr Adeyemi",
        material: [],
        cover: "img/2.jpg",
      },
      {
        id: 3,
        name: "CSC 345",
        creator: "Mr Arigbasogun",
        material: [],
        cover: "img/3.jpg",
      },
      {
        id: 4,
        name: "CSC 409",
        creator: "Dr Ibrahim",
        material: [],
        // cover: "img/4.jpg",
      },
      {
        id: 5,
        name: "CSC 422",
        creator: "Prof Salisu",
        material: [],
        cover: "img/5.jpg",
      },
      {
        id: 6,
        name: "CSC 111",
        creator: "Jane Doe",
        material: [],
        // cover: "img/6.jpg",
      },
      {
        id: 7,
        name: "CSC 381",
        creator: "Mr Aladiye",
        material: [],
        cover: "img/7.jpg",
      },
    ],
    course: {},
  };

  const [state, dispatch] = useReducer(CourseReducer, initialState);

  // DELETE COURSE
  const deleteCourse = async (id) => {
    const res = axios.delete(`http://localhost:3200/api/courses/${id}`);
  };

  // UPDATE COURSE
  const editCourse = (id, newCourse) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorize: localStorage.getItem("token"),
      },
    };

    try {
      const res = axios.put(
        `http://localhost/3200/api/courses/${id}`,
        newCourse,
        config
      );

      dispatch({ type: EDIT_COURSE, payload: res.data });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //   JOIN COURSE
  const joinCourse = (courseId) => {
    try {
      const res = axios.patch(`http://localhost:3200/api/courses/${courseId}`);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getCourses = () => {
    try {
      const res = axios.get("http://localhost:3200/api/courses");

      dispatch({ type: GET_COURSES, payload: res.data });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getCourse = (id) => {
    try {
      const res = axios.get(`http://localhost:3200/api/courses/${id}`);

      // dispatch({ type: GET_COURSES, payload: res.data });
      dispatch({ type: GET_COURSE, payload: id });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const value = {
    courses: state.courses,
    course: state.course,
    deleteCourse,
    editCourse,
    joinCourse,
    getCourses,
    getCourse,
  };

  return (
    <CourseContext.Provider value={value}>
      {prop.children}
    </CourseContext.Provider>
  );
};

export default CourseState;
