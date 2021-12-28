import axios from "axios"

export  default function AxiosInitializer(){
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.headers.common["Authorization"] = JSON.parse(localStorage?.getItem("auth"))?.token;
}