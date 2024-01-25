// frontend/src/controllers/invoiceController.js
import * as API from "../API/";
export const getGroup = async (page, name = null, report_type = null) => {
  try {
    const response = await API.callAPI_GetAllGroup(
      page,
      name,
      report_type
    );
    return response;
  } catch (error) {
    throw error;
  }
};
