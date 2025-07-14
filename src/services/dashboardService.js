import {dashboardUserApi} from "../api/dashboardApi.js";

export const dashboardUserService = async () => {
    try {
        const response = await dashboardUserApi();
        return response.data;
    } catch (error) {
        throw error.response?.data || {
            message: "Failed to fetch dashboard user",
        };
    }
};