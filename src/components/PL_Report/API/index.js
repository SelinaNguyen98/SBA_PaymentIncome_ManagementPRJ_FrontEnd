import axios from "axios";
import { paths } from "../../../Utils/utils/configAxios";
import { saveAs } from 'file-saver';
//EXPORT
export const callAPI_GetdataPL = async (y) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.get(paths.PL_REPORT, {
      params: {
        y,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callAPI_ExportPL = async (y) => {
  try {
    const response = await axios.get(paths.EXPORT_PL, {
      params: {
        y,
      },
      responseType: 'blob', // Set the response type to blob
    });

    saveAs(response.data, `Profit and Loss Report_${y}.xlsx`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
