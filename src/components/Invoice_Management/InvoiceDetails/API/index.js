/* eslint-disable no-useless-catch */
// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

export const callAPI_GetPaymentsYearAndMonths = async (month, year, page) => {
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

export const callApi_deletePaymentByID = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.delete(paths.PAYMENT + "/" + id);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
