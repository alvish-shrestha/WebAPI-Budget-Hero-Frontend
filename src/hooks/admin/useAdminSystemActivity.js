import { useQuery } from "@tanstack/react-query";
import { getAllSystemActivityService, getOneSystemActivityService } from "../../services/admin/systemActivityService";

export const useAdminSystemActivity = (params = { page: 1, limit: 5 }) => {
  const query = useQuery(
    {
      queryKey: ["admin_system_activity", params],
      queryFn: () => getAllSystemActivityService(params),
      keepPreviousData: true,
    }
  );
  return { ...query };
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
