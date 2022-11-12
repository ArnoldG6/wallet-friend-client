import axios from "axios";

export default function getAxiosInstance() {
    const instance = axios.create({
        baseURL: "https://wallet-friend-server.herokuapp.com/api/v1.0",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
    });
    return instance;
}
