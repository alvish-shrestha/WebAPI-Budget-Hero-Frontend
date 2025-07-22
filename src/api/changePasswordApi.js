import axios from "./api"

export const changePasswordApi = (data) => {const token = localStorage.getItem("token");
    return axios.post("/auth/change-password", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
