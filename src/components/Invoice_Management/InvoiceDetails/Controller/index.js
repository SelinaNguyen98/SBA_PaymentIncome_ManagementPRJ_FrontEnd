// Controller.js
import * as API from "../API";

export const getPaymentsByYearAndMonths = async (month, year, page) => {
  try {
    const response = await API.callAPI_GetPaymentsYearAndMonths(
      month,
      year,
      page
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePaymentById = async (id) => {
  try {
    const response = await API.callApi_deletePaymentByID(id);
    return response;
  } catch (error) {
    throw error;
  }
};
