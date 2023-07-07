import { useContext } from "react";
import AlertContext from "../../Context/alertContext/AlertContext";

const Alert = () => {
  const alertCon = useContext(AlertContext);
  const { alert } = alertCon;

  if (alert.length === 0) return;

  return (
    <div>
      {alert.map((ale) => (
        <div
          key={ale.id}
          className={`${
            ale.type === "good" ? "bg-green-500" : "bg-red-500"
          } p-2 text-white text-sm font-semibold my-1`}
        >
          {ale.text}
        </div>
      ))}
    </div>
  );
};

export default Alert;
