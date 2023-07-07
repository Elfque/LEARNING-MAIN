import { useContext } from "react";
import AuthContext from "../../Context/authContext/AuthContext";

const StudentMessaages = ({ course }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {course?.messages.map((mess, idx) => (
        <div
          className={`flex ${
            mess.sender === user ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-sm text-gray-800 ${
              mess.sender === user
                ? "bg-transparent border border-gray-400"
                : "bg-blue-400/50"
            }`}
            key={idx}
          >
            {mess.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentMessaages;
