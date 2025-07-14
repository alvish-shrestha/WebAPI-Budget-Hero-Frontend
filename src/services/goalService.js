import {
    createGoalUserApi,
    getGoalUserApi,
    updateGoalUserApi,
    deleteGoalUserApi, contributeGoalUserApi,
} from "../api/goalApi.js";

export const createGoalUserService = async (data) => {
    try {
        const response = await createGoalUserApi(data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to create goal" };
    }
};

export const getGoalUserService = async (params) => {
    try {
        const response = await getGoalUserApi(params);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch goals" };
    }
};

export const updateGoalUserService = async (id, data) => {
    try {
        const response = await updateGoalUserApi(id, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update goal" };
    }
};

export const deleteGoalUserService = async (id) => {
    try {
        const response = await deleteGoalUserApi(id);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete goal" };
    }
};

export const contributeGoalUserService = async (id, amount) => {
    try {
        const response = await contributeGoalUserApi(id, amount);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to contribute" };
    }
};