import axios from "axios";
import { paths } from "../../../Utils/utils/configAxios";

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
