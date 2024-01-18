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

export const callApi_getExchagerateByMonthAndYear = async (month, year) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(paths.EXCHAGE_RATE, {
      params: {
        month,
        year,
      },
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const callApi_ExchagerateByMonthAndYear = async (month, year) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.get(`categories/11`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_createExchagerateByMonthAndYear = async (
  monthYear,
  jpy,
  usd,
  idExRate
) => {
  try {
    const response = await axios.post(paths.EXCHAGE_RATE, {
      id: idExRate != null   ? idExRate : null,
      exchangeDate: monthYear,
      jpy: jpy,
      usd: usd,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
