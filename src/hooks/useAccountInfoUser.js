import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUserProfileService,
    updateUserProfileService,
} from "../services/accountInfoService";
import { toast } from "react-toastify";

export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn: getUserProfileService,
    });
};

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserProfileService,
        onSuccess: async (data) => {
            toast.success(data?.message || "Profile updated");
            await queryClient.invalidateQueries(["user-profile"]);
        },
        onError: (err) => {
            toast.error(err?.message || "Update failed");
        },
    });
};
