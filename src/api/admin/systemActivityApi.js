import axios from "../api";

export const getAllSystemActivityApi = () => axios.get("/admin/system-activity/overview");
export const getOneSystemActivityApi = (id) => axios.get("/admin/system-activity/" + id);