import { getStreakApi } from "../api/streakApi.js";

export const getStreakService = async (params) => {
    try {
        const response = await getStreakApi(params);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch streak" };
    }
};