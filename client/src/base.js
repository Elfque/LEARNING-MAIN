import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  authorize: localStorage.getItem("token"),
  headers: {
    "Content-Type": "application/json",
    authorize: localStorage.getItem("token"),
  },
});
