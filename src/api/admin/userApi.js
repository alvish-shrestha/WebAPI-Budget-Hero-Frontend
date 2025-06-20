import axios from "../api";

export const getAllUserApi = (params) => axios.get("/admin/user/", {params})
export const getOneUserApi = (id) => axios.get("/admin/user/" + id)
export const createOneUserApi = (data) => axios.post("/admin/user/", data)
export const updateOneUserApi = (id, data) => axios.put("/admin/user/" + id, data)
export const deleteOneUserApi = (id) => axios.delete("/admin/user/" + id)