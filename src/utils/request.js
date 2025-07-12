import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, // 👈 SEND COOKIES automatically
    // baseURL: "http://localhost:5000"
})

export default request