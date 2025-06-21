import axios from "../api";

export const getAllSystemActivityApi = (params) => axios.get("/admin/system-activity/", { params });
export const getOneSystemActivityApi = (id) => axios.get("/admin/system-activity/" + id);