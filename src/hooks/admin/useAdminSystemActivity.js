import { useQuery } from "@tanstack/react-query";
import { getAllSystemActivityService, getOneSystemActivityService } from "../../services/admin/systemActivityService";

export const useAdminSystemActivity = () => {
    return useQuery({
        queryKey: ["admin_system_activity"],
        queryFn: getAllSystemActivityService,
        keepPreviousData: true,
    });
};

export const useGetOneSystemActivity = (id) => {
  const query = useQuery(
    {
      queryKey: ["admin_system_activity_detail", id],
      queryFn: () => getOneSystemActivityService(id),
      enabled: !!id,
      retry: false,
    }
  );

  const activity = query.data?.data || {};
  return { ...query, activity };
};
