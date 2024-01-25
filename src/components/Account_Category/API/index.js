/* eslint-disable no-useless-catch */
// API.js
import axios from "axios";
import { paths } from "../../../Utils/utils/configAxios";

export const callAPI_GetAllCategory = async (page) => {
  try {
    const response = await axios.get(paths.CATEGORY, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callAPI_deleteByID = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(paths.CATEGORY, {
      params: {
        id,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

