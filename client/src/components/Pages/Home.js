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

    if (error === "Authorization Failed") navigate("/signin");
  }, [error, user]);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <StudentHome />
      </div>
    </>
  );
};

export default Home;
