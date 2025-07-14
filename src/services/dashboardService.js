import {
    addTransactionUserApi,
    getTransactionUserApi,
    updateTransactionUserApi,
    deleteTransactionUserApi,
} from "../api/dashboardApi.js";

export const addTransactionUserService = async (data) => {
    try {
        const response = await addTransactionUserApi(data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to add transaction" };
    }
};

export const getTransactionUserService = async () => {
    try {
        const response = await getTransactionUserApi();
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch transactions" };
    }
};

export const updateTransactionUserService = async (id, data) => {
    try {
        const response = await updateTransactionUserApi(id, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update transaction" };
    }
};

export const deleteTransactionUserService = async (id) => {
    try {
        const response = await deleteTransactionUserApi(id);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete transaction" };
    }
};
