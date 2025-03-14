import axios from "axios"

const axiosInstance=axios.create({
    baseURL: import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "https://real-time-chat-application-beta.vercel.app/api",
    withCredentials:true
})

export default axiosInstance