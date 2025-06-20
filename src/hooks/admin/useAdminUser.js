import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// useQuery -> Get request states
import { useState } from "react";
import { deleteOneUserService, getAllUserService, getOneUserService, updateOneUserService } from "../../services/admin/userService";
import { toast } from "react-toastify";

export const useAdminUser = () => {
    const query = useQuery(
        {
            queryKey: ["admin_users"], // keys and variable to re-apply query
            queryFn: () => {
                return getAllUserService(
                    {
                        page: 1,
                        limit: 5
                    }
                )
            },
            keepPreviousData: true // cache data
        }
    )
    return {
        ...query
    }
}

// export const useCreateUser = () => {
//     const queryClient = useQueryClient()
//     return useMutation(
//         {
//             mutationKey: ["admin_create_user"],
//             mutationFn: createOneUserService,
//             onSuccess: () => {
//                 queryClient.invalidateQueries(
//                     "admin_user"
//                 )
//             }
//         }
//     )
// }

export const useGetOneUser = (id) => {
    const query = useQuery(
        {
            queryKey: ["admin_users_detail", id],
            queryFn: () => getOneUserService(id),
            enabled: !!id, // id is not null or undefined
            retry: false // tries 3 times default
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