// Controller.js
import * as API from "../API";

export const getPaymentsByYearAndMonths = async (month, year, page) => {
  try {
    const response = await API.callAPI_PaymentsYearAndMonths(month, year, page);
    return response;
  } catch (error) {
    throw error;
  }
};
