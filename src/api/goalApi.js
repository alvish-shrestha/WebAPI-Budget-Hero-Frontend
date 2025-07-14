import axios from "./api";

export const createGoalUserApi = (data) => axios.post("/goals/createGoal", data)
export const getGoalUserApi = (params) => axios.get("/goals/", { params })
export const updateGoalUserApi = (id, data) => axios.put(`/goals/updateGoal/${id}`, data)
export const deleteGoalUserApi = (id) => axios.delete(`/goals/deleteGoal/${id}`)
export const contributeGoalUserApi = (id, amount) => axios.post(`/goals/${id}/contribute`, { amount })