import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/authContext/AuthContext";
import Alert from "../layout/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertContext from "../../Context/alertContext/AlertContext";
import Loader from "../layout/Loader";

const Login = () => {
  const authCon = useContext(AuthContext);
  const alertCon = useContext(AlertContext);

  const { addAlert } = alertCon;
  const { authSuccess, authError, isAuthenticated } = authCon;

  const [logDetails, setLogDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logInUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:3200/api/auth",
        logDetails,
        config
      );

      setLoading(false);
      authSuccess(res);
      console.log(res);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      addAlert(error.response.data.msg);
      authError(error);
    }
  };

  const changing = (e) =>
    setLogDetails({ ...logDetails, [e.target.name]: e.target.value });

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <form
        action=""
        onSubmit={logInUser}
        className="mx-auto w-[90%] max-w-xs p-6 border border-blue-500 rounded-2xl"
      >
        <h3 className="text-center pb-4 font-semibold text-2xl">Sign In</h3>
        <Alert />
        <div className="form-control mt-6">
          <input
            type="email"
            name="email"
            id="email"
            onChange={changing}
            className="inp"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-control mt-6">
          <input
            type="password"
            name="password"
            id="password"
            onChange={changing}
            className="inp"
            placeholder="Password"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="sign_btn">
            {loading && <Loader />} Sign In
          </button>
        </div>
        <div className="text-sm mt-6 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-600" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
