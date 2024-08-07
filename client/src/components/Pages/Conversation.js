import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import AuthContext from "../../Context/authContext/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import { axiosInstance } from "../../base";

const Conversation = () => {
  const { user, loadUser, error, conversations, getConversations } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [currConv, setCurrConv] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/users/message", {
        destination: id,
        text: message,
      });

      const current = res.data.find((conv) => conv.id === id);
      setCurrConv(current);
    } catch (error) {
      console.log(error.response);
    }
  };

  const formatTime = (date) => {
    const realDate = new Date(date);

    return `${realDate.getHours()} : ${realDate.getMinutes()}`;
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    if (!user) loadUser();
    if (error && error === "Authorization Failed") navigate("/signin");

    if (user) {
      if (!conversations) {
        getConversations();
      } else {
        const current = conversations.find((conv) => conv.id === id);
        setCurrConv(current);
      }
    }
  }, [user, error, id]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="grid grid-cols-conversationsGrid bg-gray-100 h-screen">
        <div className="conversation-list p-2 bg-white border-r-2 ">
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
        <div className="messages grid grid-rows-message">
          {/* <div>MEssae Details</div> */}
          <div className={`flex bg-bluish gap-4 items-center text-white px-4`}>
            <BsPersonCircle className="text-2xl" />
            {currConv?.name}
          </div>
          {/* SENT MESSAGES */}
          <div className="overflow-hidden sent-messages">
            <div className="overflow-y-auto px-2 h-full">
              {currConv?.messages.map((message, idx) => (
                <div
                  className={`my-2 flex ${
                    message.sender === user._id && "justify-end"
                  } `}
                  key={idx}
                >
                  <div
                    className={`single-message rounded-md text-[12px] p-1 w-3/5 ${
                      message.sender === user._id
                        ? "bg-bluish text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className="text-end">{formatTime(message.time)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            className="grid grid-cols-message gap-2 bg-gray-200 p-2"
            onSubmit={sendMessage}
          >
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              className="h-20 p-3 text-sm text-gray-700 outline-none rounded-lg resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-bluish flex justify-center rounded-md items-center"
            >
              <BiSend className="text-white  text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
