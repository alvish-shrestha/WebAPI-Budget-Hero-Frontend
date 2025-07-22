import { changePasswordService } from "../services/changePasswordService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useChangePasswordUser = () => {
    return useMutation({
        mutationFn: changePasswordService,
        mutationKey: ["change-password"],
        onSuccess: (data) => {
            toast.success(data?.message || "Password updated successfully");
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update password");
        },
    });
};
