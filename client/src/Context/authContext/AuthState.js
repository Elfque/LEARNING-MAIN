import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  AUTH_FAILED,
  LOGOUT,
  USER_LOADED,
  CONVERSATIONS,
} from "../type";

const AuthState = (prop) => {
  const initialState = {
    conversations: null,
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // LOAD USER
  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:3200/api/auth", {
        headers: {
          authorize: localStorage.getItem("token"),
        },
      });
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAILED, payload: err.response.data.msg });
    }
  };

  // REGISTER/LOGIN FAILED
  const authError = (error) =>
    dispatch({ type: AUTH_FAILED, payload: error.response.data.msg });

  // LOGIN SUCCESS / TOKEN GENERATED
  const authSuccess = (res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser();
  };

  const getConversations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3200/api/users/conversations",
        {
          headers: {
            authorize: localStorage.getItem("token"),
          },
        }
      );
      dispatch({ type: CONVERSATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAILED, payload: err.response.data.msg });
    }
  };

  const logOutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const values = {
    user: state.user,
    error: state.error,
    conversations: state.conversations,
    authSuccess,
    authError,
    loadUser,
    logOutUser,
    getConversations,
  };

  return (
    <AuthContext.Provider value={values}>{prop.children}</AuthContext.Provider>
  );
};

export default AuthState;
