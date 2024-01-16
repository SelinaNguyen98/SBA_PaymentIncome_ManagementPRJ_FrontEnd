// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configApi";

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

    return response.data;
  } catch (error) {
    throw error;
  }
};
