import {
    getUserProfileApi,
    updateUserProfileApi,
} from "../api/accountInfoApi";

export const getUserProfileService = async () => {
    try {
        const res = await getUserProfileApi();
        return res.data.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch profile" };
    }
};

export const updateUserProfileService = async (data) => {
    try {
        const res = await updateUserProfileApi(data);
        return res.data.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update profile" };
    }
};
