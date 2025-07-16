import axios from "./api.js";

export const getStreakApi = (params) => axios.get("/auth/streak", { params })