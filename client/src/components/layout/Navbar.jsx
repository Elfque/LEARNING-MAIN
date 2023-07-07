import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/authContext/AuthContext";

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

        <img
          src="/img/image1.jpg"
          alt=""
          className="w-8 h-8 object-cover rounded-[50%] border-black border-2"
          onClick={() => setShowMenu(!showMenu)}
          onBlur={() => setShowMenu(false)}
        />
        <div className={`over ${showMenu ? "block" : "hidden"}`}>
          <button onClick={logOut}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
