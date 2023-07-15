import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/authContext/AuthContext";
import { PiSignOutBold } from "react-icons/pi";
import { BiSolidMessage } from "react-icons/bi";
import { FaDiscourse } from "react-icons/fa";

const Navbar = ({ opener }) => {
  const authCon = useContext(AuthContext);
  const { user, logOutUser, loadUser } = authCon;

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    setShowMenu(false);
    logOutUser();

    navigate("/signin");
  };

  useEffect(() => {
    !user && loadUser();
  }, []);

  return (
    <div className="relative">
      <nav className="side-bar py-1 items-center mx-auto bg-bluish p-4 text-white min-h-screen">
        <div className="logo font-semibold text-2xl font-reos mb-4">
          Learners
        </div>
        <div className="flex flex-col font-semibold">
          <Link
            to={
              user && user.accountType === "admin"
                ? "/admin/courses"
                : "/courses"
            }
            className="hover:bg-blue-700 p-2 flex gap-4 items-center"
          >
            <FaDiscourse /> Courses
          </Link>

          <Link
            to={"/courses/register"}
            className="hover:bg-blue-700 p-2 flex gap-4 items-center"
          >
            <FaDiscourse /> Register Course
          </Link>

          <Link
            to={"/chats"}
            className="hover:bg-blue-700 p-2 flex gap-4 items-center"
          >
            <BiSolidMessage /> Conversations
          </Link>

          <button
            className="hover:bg-blue-700 p-2 flex gap-4 items-center"
            onClick={logOut}
          >
            <PiSignOutBold /> Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
