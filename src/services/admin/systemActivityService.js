import { getAllSystemActivityApi, getOneSystemActivityApi } from "../../api/admin/systemActivityApi";

export const getAllSystemActivityService = async (params) => {
  try {
    const response = await getAllSystemActivityApi(params);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response?.data || { message: "System Activity Fetch Fail" };
  }
};

export const getOneSystemActivityService = async (id) => {
  try {
    const response = await getOneSystemActivityApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch system activity" };
  }
};
