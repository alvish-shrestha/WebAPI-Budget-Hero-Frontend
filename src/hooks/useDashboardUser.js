import { dashboardUserService } from "../services/dashboardService.js";
import {useQuery} from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { AuthContext } from "../auth/AuthProvider";
// import { useContext } from "react";

export const useDashboardUser = () => {
    // const {dashboard} = useContext(AuthContext)
    return useQuery(
        {
            queryKey: ["dashboard-user"],
            queryFn: dashboardUserService,
            // onSuccess: (data) => {
            //     dashboard(data?.data, data?.token);
            // },
            onError: (err) => {
                toast.error(err?.message || "Failed to fetch user");
            },
            staleTime: 5 * 60 * 1000, // cache for 5 minutes
        }
    )
}