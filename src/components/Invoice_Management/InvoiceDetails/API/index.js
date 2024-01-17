// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

export const callAPI_PaymentsYearAndMonths = async (month, year, page) => {
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, {
      params: {
        month,
        year,
        page,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
