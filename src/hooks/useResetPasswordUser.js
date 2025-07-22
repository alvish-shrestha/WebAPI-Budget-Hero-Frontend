import { useMutation } from "@tanstack/react-query";
import {confirmResetPasswordService, requestResetPasswordService} from "../services/resetPasswordService";
import { toast } from "react-toastify";

export const useRequestResetPassword = () => {
    return useMutation({
        mutationFn: requestResetPasswordService,
        mutationKey: ["request-reset-password"],
        onSuccess: (data) => {
            toast.success(data?.message || "Reset link sent to your email");
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to send reset link");
        },
    });
};

export const useConfirmResetPassword = () => {
    return useMutation({
        mutationFn: ({ token, password }) =>
            confirmResetPasswordService(token, password),
        mutationKey: ["confirm-reset-password"],
        onSuccess: (data) => {
            toast.success(data?.message || "Password has been reset successfully");
        },
        onError: (error) => {
            toast.error(error?.message || "Password reset failed");
        },
    });
};