// frontend/src/api/invoiceApi.js
import axios from 'axios';
import { paths } from "../../../Utils/utils/configAxios"
export const callAPI_GetAllGroup = async (page, name = null, report_type = null) => {
  // Create a new AbortController
  const controller = new AbortController();
  const { signal } = controller;

  // eslint-disable-next-line no-useless-catch
  try {
    const params = {
      page,
      ...(name !== null && { name }),
      ...(report_type !== null && { report_type }),
    };

    const response = await axios.get(paths.GROUP, {
      params,
      signal, // Attach the signal to the request
    });

    return response.data;
  } catch (error) {
    // Check if the error is due to an aborted request
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      throw error;
    }
  }
  
  // You can expose the controller to the calling code if needed
  return controller;
};
