import {
  deleteFeedbackApi,
  getAllFeedbackApi,
  getOneFeedbackApi,
  updateFeedbackApi
} from "../../api/admin/feedbackApi";

export const getAllFeedbackService = async (params) => {
  try {
    const response = await getAllFeedbackApi(params);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response?.data || { message: "Feedback fetch failed" };
  }
};

export const getOneFeedbackService = async (id) => {
  try {
    const response = await getOneFeedbackApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch feedback" };
  }
};

export const updateFeedbackService = async (id, data) => {
  try {
    const response = await updateFeedbackApi(id, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update feedback" };
  }
};

export const deleteFeedbackService = async (id) => {
  try {
    const response = await deleteFeedbackApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete feedback" };
  }
};
