import axios from "axios";

const request = axios.create({
    baseURL: "https://carrent.space"
})

export default request