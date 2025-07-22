import axios from "./api";

export const requestResetPasswordApi = (email) =>
    axios.post("/auth/request-reset", { email });

export const confirmResetPasswordApi = (token, password) =>
    axios.post(`/auth/reset-password/${token}`, { password });
