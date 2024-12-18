import axios from "axios";

export const API_URL = "https://h4572thw-5254.euw.devtunnels.ms"

const $api = axios.create(
    {
        withCredentials:true,
        baseURL:API_URL,
    }
)

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

export default $api