// Controller.js
import * as API from "../API";

export const getOrderByYearAndMonths = async (selectedDate, current_page) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const year = selectedDate.getFullYear();
    
    const response = await API.callAPI_GetOrder(month, year, current_page);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExChangeRateByMonthYear = async (month, year) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callApi_getExchagerateByMonthAndYear(
      month,
      year
    );
    return [response.status, response.data];
  } catch (error) {
    throw error;
  }
};

export const deleteOrderByIds = async (orderIds) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_DeleteOrder(orderIds);
    return response;
  } catch (error) {
    throw error;
  }
};