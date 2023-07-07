import {
  CREATE_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
  GET_COURSES,
  GET_COURSE,
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
      break;
    case GET_COURSE:
      return {
        ...state,
        course: state.courses.find((cour) => cour.id == action.payload),
      };
      break;

    default:
      break;
  }
};
