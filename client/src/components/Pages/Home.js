import { useContext, useEffect } from "react";
import AuthContext from "../../Context/authContext/AuthContext";
import StudentHome from "./StudentHome";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authCon = useContext(AuthContext);
  const { user, loadUser, error } = authCon;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");

    !user && loadUser();

    if (error === "Authorization Failed") {
      localStorage.removeItem("token");
      window.location.replace("/signin");
    }

    if (user) {
      navigate("/courses");
    }
  }, [error, user]);

  return (
    <>
      <div className="">
        <div className="w-60">
          <StudentHome />
        </div>
      </div>
    </>
  );
};

export default Home;
