import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/authContext/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const authCon = useContext(AuthContext);
  const { user, logOutUser } = authCon;

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    setShowMenu(false);
    logOutUser();

    navigate("/signin");
  };

  return (
    <div className="relative">
      <nav className="nav flex justify-between py-1 items-center mx-auto">
        <div className="logo font-semibold text-2xl font-reos">Learners</div>
        <BsPersonCircle
          onBlur={() => setShowMenu(false)}
          className="w-8 h-8 rounded-[50%] text-gray-400 border-2"
          onClick={() => setShowMenu(!showMenu)}
        />
        {/* <img src="/img/image1.jpg" alt="" /> */}
        <div className={`over ${showMenu ? "block" : "hidden"}`}>
          <button onClick={logOut}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
