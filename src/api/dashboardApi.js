import axios from "./api";

export const dashboardUserApi = () => axios.get("/transactions/")