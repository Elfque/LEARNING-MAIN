import { useContext, useEffect } from "react";
import AuthContext from "../../Context/authContext/AuthContext";
import StudentHome from "./StudentHome";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authCon = useContext(AuthContext);
  const { user, isAuthenticated, loadUser } = authCon;

  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/signin");
    // }
    loadUser();

    // if (!isAuthenticated) {
    //   navigate("/signin");
    //   return;
    // }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <StudentHome />
      </div>
    </>
  );
};

export default Home;
