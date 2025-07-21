import axios from "./api"

const token = () => localStorage.getItem("token")

export const getUserProfileApi = () => axios.get("/accountInfo/profile", {
    headers: { Authorization: `Bearer ${token()}` },
})

export const updateUserProfileApi = (payload) => axios.put("/accountInfo/profile", payload, {
    headers: { Authorization: `Bearer ${token()}` },
});