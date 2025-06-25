import axios from "axios";

const request = axios.create({
    baseURL: "https://carrent.space",
    withCredentials: true, // 👈 SEND COOKIES automatically
    // baseURL: "http://localhost:5000"
})

export default request