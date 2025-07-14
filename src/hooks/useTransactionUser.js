import {
    addTransactionUserService,
    deleteTransactionUserService,
    getTransactionUserService,
    updateTransactionUserService
} from "../services/dashboardService.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { AuthContext } from "../auth/AuthProvider";
// import { useContext } from "react";

// Fetch all transactions
export const getTransactionUser = () => {
    return useQuery({
        queryKey: ["dashboard-user"],
        queryFn: getTransactionUserService,
        onError: (err) => {
            toast.error(err?.message || "Failed to fetch transactions");
        },
        staleTime: 5 * 60 * 1000,
    });
};

// Add transaction
export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => addTransactionUserService(data),
        onSuccess: async () => {
            toast.success("Transaction added!");
            await queryClient.invalidateQueries({ queryKey: ["dashboard-user"] });
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to add transaction");
        },
    });
};

// Update transaction
export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTransactionUserService(id, data),
        onSuccess: async () => {
            toast.success("Transaction updated!");
            await queryClient.invalidateQueries({ queryKey: ["dashboard-user"] });
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to update transaction");
        },
    });
};

// Delete transaction
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTransactionUserService(id),
        onSuccess: async () => {
            toast.success("🗑️ Transaction deleted!");
            await queryClient.invalidateQueries({ queryKey: ["dashboard-user"] });
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to delete transaction");
        },
    });
};
