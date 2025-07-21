import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createFeedbackService } from "../services/feedbackService.js";

export const useCreateFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["admin_create_feedback"],
        mutationFn: createFeedbackService,
        onSuccess: async () => {
            toast.success("Feedback Created");
            await queryClient.invalidateQueries("admin_feedback");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create feedback");
        },
    });
};