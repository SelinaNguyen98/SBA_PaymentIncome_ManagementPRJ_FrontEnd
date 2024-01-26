// frontend/src/api/invoiceApi.js
import axios from 'axios';
import { paths } from "../../../Utils/utils/configAxios"
export const callAPI_GetAllGroup = async (page, name = null, report_type = null) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const params = {
      page,
      ...(name !== null && { name }),
      ...(report_type !== null && { report_type }),
    };

    const response = await axios.get(paths.GROUP, {
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
