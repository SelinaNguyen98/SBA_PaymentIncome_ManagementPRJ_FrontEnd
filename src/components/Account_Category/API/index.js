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
    const response = await axios.delete(paths.CATEGORY, 
      { data: {id: id}
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_createCategory = async (
  name,
  group_id
) => {
  try {
    const response = await axios.post(paths.CATEGORY, {
      name: name,
      group_id: group_id
      // id: idExRate != null ? idExRate : null,
      // jpy: jpy,
      // usd: usd,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_getGroupCategory = async (
  
) => {
  try {
    const response = await axios.get(paths.GROUPCATEGORY + "/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_editCategory = async (
  id,
  name,
  group_id
) => {
  try {
    const response = await axios.put(paths.CATEGORY + "/" + id, {
      name: name,
      group_id: group_id
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


