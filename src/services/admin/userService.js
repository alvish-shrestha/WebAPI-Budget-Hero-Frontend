import { data } from "react-router-dom";
import { createOneUserApi, deleteOneUserApi, getAllUserApi, getOneUserApi, updateOneUserApi } from "../../api/admin/userApi";

export const getAllUserService = async (params) => {
    try {
        const response = await getAllUserApi(params)
        return response.data
    } catch (err) {
        console.log(err)
        throw err.response?.data || { "message": "User Fetch Fail" }
    }
}

export const getOneUserService = async (id) => {
    try {
        const response = await getOneUserApi(id)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch" }
    }
}

export const createOneUserService = async (data) => {
    try {
        const response = await createOneUserApi(data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err.response?.data || { message: "Failed to create" }
    }
}

export const updateOneUserService = async (id, data) => {
    try {
        const response = await updateOneUserApi(id, data)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to upload" }
    }
}

export const deleteOneUserService = async (id) => {
    try {
        const response = await deleteOneUserApi(id)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to delete" }
    }
}