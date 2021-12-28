import axios from "axios"

export  default function AxiosInitializer(){
    axios.defaults.baseURL = "https://meetyourbackend.herokuapp.com/";
    axios.defaults.headers.common["Authorization"] = JSON.parse(localStorage?.getItem("auth"))?.token;
}