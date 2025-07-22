import { changePasswordApi } from "../api/changePasswordApi";

export const changePasswordService = async (formData) => {
    try {
        const response = await changePasswordApi(formData);
        return response.data; // return only the useful part
    } catch (error) {
        throw error.response?.data || {
            message: "Password change failed",
        };
    }
};
