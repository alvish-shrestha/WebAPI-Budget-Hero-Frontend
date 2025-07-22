import {
    requestResetPasswordApi,
    confirmResetPasswordApi,
} from "../api/resetPasswordApi";

export const requestResetPasswordService = async (email) => {
    try {
        const response = await requestResetPasswordApi(email);
        return response.data;
    } catch (error) {
        throw error.response?.data || {
            message: "Failed to send reset link",
        };
    }
};

export const confirmResetPasswordService = async (token, password) => {
    try {
        const response = await confirmResetPasswordApi(token, password);
        return response.data;
    } catch (error) {
        throw error.response?.data || {
            message: "Password reset failed",
        };
    }
};
