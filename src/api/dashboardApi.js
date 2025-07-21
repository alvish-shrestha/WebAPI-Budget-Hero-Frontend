import axios from "./api";

export const addTransactionUserApi = (data) => axios.post("/transactions/addTransaction", data)
export const getTransactionUserApi = (params) => axios.get("/transactions/", { params })
export const updateTransactionUserApi = (id, data) => axios.put(`/transactions/updateTransaction/${id}`, data)
export const deleteTransactionUserApi = (id) => axios.delete(`/transactions/deleteTransaction/${id}`)