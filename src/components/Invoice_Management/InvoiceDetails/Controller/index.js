// Controller.js
import { formatNumberHasDot } from "../../../../Utils/utils/maths";
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

export const getExChangeRateByMonthYear = async (month, year) => {
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

export const createExChangeRate = async (month, year, jpy, usd, idExRate) => {
  try {
    // if idExRate is null || trim, ''  => create
    const response = await API.callApi_createExchagerateByMonthAndYear(
      month + "-" + year,
      formatNumberHasDot(jpy),
      formatNumberHasDot(usd),
      idExRate
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getGetAllCategoriesPL = async () => {
  try {
    const response = await API.callAPI_GetAllCategoriesPL();
    return response;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async (formData) => {
  try {
    // if idExRate is null || trim, ''  => create
    const response = await API.callApi_createPayment(formData);

    return response;
  } catch (error) {
    throw error;
  }
};
