import axios from "../api";

export const getAllFeedbackApi = (params) => axios.get("/admin/feedback/", { params })
export const getOneFeedbackApi = (id) => axios.get("/admin/feedback/" + id)
export const updateFeedbackApi = (id, data) => axios.put("/admin/feedback/" + id, data);
export const deleteFeedbackApi = (id) => axios.delete("/admin/feedback/" + id)