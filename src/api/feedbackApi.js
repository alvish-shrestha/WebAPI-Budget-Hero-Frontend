import axios from "./api";

export const createFeedbackApi = (data) => axios.post("/userFeedback/create", data);