import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../layout/Alert";
import AuthContext from "../../Context/authContext/AuthContext";
import AlertContext from "../../Context/alertContext/AlertContext";
import axios from "axios";
import Loader from "../layout/Loader";
import { axiosInstance } from "../../base";

const Register = () => {
  const authCon = useContext(AuthContext);
  const { authError } = authCon;

  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const navigate = useNavigate();

  const [regDetails, setRegDetails] = useState({
    email: "",
    first_name: "Adex",
    last_name: "Silva",
    password: "",
    password1: "",
    faculty: "CIS",
    department: "Computer Science",
    currentLevel: 100,
  });
  const [loading, setLoading] = useState(false);

  const { password, password1, accountType } = regDetails;

  const changing = (e) =>
    setRegDetails({ ...regDetails, [e.target.name]: e.target.value });

  const registerUse = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.post(`/api/users`, regDetails);

      console.log(res.data);
      setLoading(false);
      window.location.replace("/signin");
    } catch (error) {
      // console.log(error.response.data.msg);
      authError(error);
      setLoading(false);
    }
  };

  const onRegister = (e) => {
    e.preventDefault();

    if (password !== password1) {
      addAlert("Passwords Don't match");
      return;
    }

    registerUse();
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <form
        action=""
        onSubmit={onRegister}
        className="w-[90%] max-w-xs  border border-blue-500 rounded-2xl p-4"
      >
        <h3 className="text-center pb-4 font-semibold text-2xl">Sign Up</h3>
        <Alert />
        <div className="form-control mt-4">
          <input
            type="text"
            name="email"
            id="email"
            className="inp"
            onChange={changing}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-control mt-4">
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="inp"
            onChange={changing}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-control mt-4">
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="inp"
            onChange={changing}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-control mt-4">
          <input
            type="password"
            name="password"
            id="password"
            className="inp"
            onChange={changing}
            placeholder="Password"
            required
          />
        </div>

        <div className="form-control mt-4">
          <input
            type="password"
            name="password1"
            id="password1"
            className="inp"
            onChange={changing}
            placeholder="Confirm Password"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-bluish w-3/5 rounded-[20px] p-2 text-white mt-4"
          >
            {loading && <Loader />} Sign Up
          </button>
        </div>

        <div className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to={"/signin"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
