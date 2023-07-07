import { LOGIN_SUCCESS, AUTH_FAILED, LOGOUT, USER_LOADED } from "../type";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
      };
      break;
    case AUTH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      break;
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
      break;
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      break;

    default:
      break;
  }
};
