import { useContext, useEffect } from "react";
import Navbar from "../layout/Navbar";
import AuthContext from "../../Context/authContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Conversations = () => {
  const { user, loadUser, error } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    if (!user) loadUser();
    if (error && error === "Authorization Failed") navigate("/signin");
  }, [user, error]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="grid grid-cols-conversationsGrid">
        <div className="conversation-list p-2 bg-white">
          <div className="text-xl">Chats</div>

          {user?.conversations?.map((convo, idx) => (
            <Link to={`/chat/${convo.id}`} key={idx}>
              <div className="card flex justify-between items-center p-2 hover:bg-gray-100">
                <div className="name capitalize">{convo.name}</div>
                <div
                  className={`resp w-2 h-2 rounded-full ${
                    !convo.responded ? "bg-red-500" : "bg-gray-700"
                  }`}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
