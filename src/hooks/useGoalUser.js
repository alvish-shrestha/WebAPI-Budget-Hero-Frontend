import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createGoalUserService,
    getGoalUserService,
    updateGoalUserService,
    deleteGoalUserService, contributeGoalUserService,
} from "../services/goalService";
import { toast } from "react-toastify";

// Fetch all goals
export const useGetGoals = (params = {}) => {
    return useQuery({
        queryKey: ["goals", params],
        queryFn: () => getGoalUserService(params),
        staleTime: 5 * 60 * 1000,
    });
};

// Create a new goal
export const useCreateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGoalUserService,
        onSuccess: async () => {
            toast.success("Goal created successfully");
            await queryClient.invalidateQueries(["goals"]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create goal");
        },
    });
};

// Update an existing goal
export const useUpdateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateGoalUserService(id, data),
        onSuccess: async () => {
            toast.success("Goal updated successfully");
            await queryClient.invalidateQueries(["goals"]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update goal");
        },
    });
};

// Delete a goal
export const useDeleteGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteGoalUserService,
        onSuccess: async () => {
            toast.success("Goal deleted successfully");
            await queryClient.invalidateQueries(["goals"]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete goal");
        },
    });
};

export const useContributeGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, amount }) => contributeGoalUserService(id, amount),
        onSuccess: async () => {
            toast.success("Contribution added successfully");
            await queryClient.invalidateQueries(["goals"]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to contribute");
        },
    });
};