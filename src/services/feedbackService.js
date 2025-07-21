import { createFeedbackApi } from "../api/feedbackApi.js";

export const createFeedbackService = async (data) => {
    try {
        const response = await createFeedbackApi(data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to create feedback" };
    }
};