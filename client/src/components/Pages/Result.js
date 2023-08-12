import { useContext, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import AuthContext from "../../Context/authContext/AuthContext";

const Result = () => {
  const [result, setResult] = useState(null);
  const { user, loadUser, error } = useContext(AuthContext);

  const getCourse = async () => {
    try {
      const res = await axios.get("http://localhost:3200/api/courses", {
        headers: {
          authorize: localStorage.getItem("token"),
        },
      });

      //   console.log(res.data);
      setResult(
        res.data.find((cou) => cou.level === user.currentLevel).courses
      );
      console.log(res.data.find((cou) => cou.level === user.currentLevel));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (user) {
      getCourse();
    }
  }, [user]);

  return (
    <div className="grid grid-cols-template">
      <div>
        <Navbar />
      </div>
      <div className="p-2">
        <div className="text-2xl font-semibold">Result for you 100level</div>

        <div className="grid divide-y-2 border border-gray-300 mt-6">
          <div className="grid grid-cols-10 text-sm divide-x-2">
            <div className="py-1 px-2 text-center">No</div>
            <div className="py-1 px-2 col-span-2">Course Code</div>
            <div className="py-1 px-2 col-span-5">Course Title</div>
            <div className="py-1 px-2 ">CA</div>
            <div className="py-1 px-2 ">Exam</div>
          </div>
          {result?.map((res, idx) => (
            <div className="grid grid-cols-10 text-sm divide-x-2" key={idx}>
              <div className="py-1 px-2 text-center">{idx + 1}</div>
              <div className="py-1 px-2 col-span-2 ">{res.code}</div>
              <div className="py-1 px-2 col-span-5 truncate">{res.title}</div>
              <div className="py-1 px-2 ">{res.grade?.CA}</div>
              <div className="py-1 px-2 ">{res.grade?.Examination}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
