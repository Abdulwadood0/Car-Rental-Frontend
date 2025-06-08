import axios from "axios";

const request = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://43.204.107.146"
})

export default request