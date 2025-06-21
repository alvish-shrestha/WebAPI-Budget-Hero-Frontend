import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFeedbackService,
  deleteFeedbackService,
  getAllFeedbackService,
  getOneFeedbackService,
  updateFeedbackService
} from "../../services/admin/feedbackService";
import { toast } from "react-toastify";

export const useAdminFeedback = () => {
  const query = useQuery({
    queryKey: ["admin_feedback"],
    queryFn: () =>
      getAllFeedbackService({
        page: 1,
        limit: 10,
      }),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_create_feedback"],
    mutationFn: createFeedbackService,
    onSuccess: () => {
      toast.success("Feedback Created");
      queryClient.invalidateQueries("admin_feedback");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create feedback");
    },
  });
};

export const useGetOneFeedback = (id) => {
  const query = useQuery({
    queryKey: ["admin_feedback_detail", id],
    queryFn: () => getOneFeedbackService(id),
    enabled: !!id,
    retry: false,
  });

  const feedback = query.data?.data || {};
  return {
    ...query,
    feedback,
  };
};

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_feedback_update"],
    mutationFn: ({ id, data }) => updateFeedbackService(id, data),
    onSuccess: () => {
      toast.success("Feedback Updated");
      queryClient.invalidateQueries(["admin_feedback", "admin_feedback_detail"]);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_feedback_delete"],
    mutationFn: deleteFeedbackService,
    onSuccess: () => {
      toast.success("Feedback Deleted");
      queryClient.invalidateQueries(["admin_feedback"]);
    },
    onError: (err) => {
      toast.error(err.message || "Delete failed");
    },
  });
};
