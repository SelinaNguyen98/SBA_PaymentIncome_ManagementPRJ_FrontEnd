// frontend/src/controllers/invoiceController.js
import * as API from "../API/";
import { callAPI_GetAllGroup } from "../API";

export const getGroup = async (page) => {
  try {
    const response = await callAPI_GetAllGroup(
      page
    );
    // You can perform additional actions with the data if needed
    return response;
  } catch (error) {
    throw error;
  }
};
