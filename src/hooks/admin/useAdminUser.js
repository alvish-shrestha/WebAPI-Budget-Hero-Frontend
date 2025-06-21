import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createOneUserService, deleteOneUserService, getAllUserService, getOneUserService, updateOneUserService } from "../../services/admin/userService";
import { toast } from "react-toastify";

export const useAdminUser = () => {
    const query = useQuery(
        {
            queryKey: ["admin_users"],
            queryFn: () => {
                return getAllUserService(
                    {
                        page: 1,
                        limit: 5
                    }
                )
            },
            keepPreviousData: true
        }
    )
    return {
        ...query
    }
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationKey: ["admin_create_user"],
            mutationFn: createOneUserService,
            onSuccess: () => {
                queryClient.invalidateQueries(
                    "admin_users"
                )
            }
        }
    )
}

export const useGetOneUser = (id) => {
    const query = useQuery(
        {
            queryKey: ["admin_users_detail", id],
            queryFn: () => getOneUserService(id),
            enabled: !!id, 
            retry: false 
        }
    )
    const user = query.data?.data || {}
    return {
        ...query, user
    }
}

export const useUpdateOneUser = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id, data}) => updateOneUserService(id, data),
            mutationKey: ["admin_user_update"],
            onSuccess: () => {
                toast.success("User Updated")
                queryClient.invalidateQueries(
                    ["admin_users", "admin_users_detail"]
                )
            },
            onError: (err) => {
                toast.error(err.message || "Update failed")
            }
        }
    )
}

export const useDeleteOneUser = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: deleteOneUserService,
            mutationKey: ["admin_user_delete"],
            onSuccess: () => {
                toast.success("Deleted")
                queryClient.invalidateQueries(["admin_users"])
            },
            onError: (err) => {
                toast.error(err.message || "Delete Failed")
            }
        }
    )
}