import axios from "axios";

const request = axios.create({
    baseURL: "https://carrent.space"
    // baseURL: "http://localhost:5000"
})

export default request