import { useQuery } from "@tanstack/react-query";
// useQuery -> Get request states
import { useState } from "react";
import { getAllUserService } from "../../services/admin/userService";

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