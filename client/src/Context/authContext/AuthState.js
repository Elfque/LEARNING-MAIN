import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import { LOGIN_SUCCESS, AUTH_FAILED, LOGOUT, USER_LOADED } from "../type";

const AuthState = (prop) => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
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
      dispatch({ type: AUTH_FAILED });
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

  const logOutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const values = {
    // token: state.token,
    accountType: state.accountType,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    authSuccess,
    authError,
    loadUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={values}>{prop.children}</AuthContext.Provider>
  );
};

export default AuthState;
