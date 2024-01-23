import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

/* eslint-disable no-useless-catch */
export const callAPI_GetAnalytics = async (month, year) => {
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    if (month < 10) {
      month = "0" + month;
    }
    month = month.toString()
    const response = await axios.get(paths.ANALYTICS, {
      params: {
        date: year + "-" + month,
      },
    });
    // console.log(response.data);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }

};
