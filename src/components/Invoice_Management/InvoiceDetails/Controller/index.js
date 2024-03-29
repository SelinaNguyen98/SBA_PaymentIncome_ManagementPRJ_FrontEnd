/* eslint-disable no-useless-catch */
// Controller.js
import { motion } from "framer-motion";
import { formatNumberHasDot } from "../../../../Utils/utils/maths";
import * as API from "../API";
import { monthsToQuarters } from "date-fns";

export const getPaymentsByYearAndMonths = async (
  month,
  year,
  page,
  controller,
  sortConfig
) => {
  try {
    const response = await API.callAPI_GetPaymentsYearAndMonths(
      month,
      year,
      page,
      controller,
      sortConfig?.key,
      sortConfig?.direction
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePaymentById = async (id) => {
  try {
    const response = await API.callAPI_DeleteListInvoice([id]);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteInvoiceByIds = async (invoiceIds) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_DeleteListInvoice(invoiceIds);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExChangeRateByMonthYear = async (month, year, controller) => {
  try {
    const response = await API.callApi_getExchagerateByMonthAndYear(
      month,
      year,
      controller
    );
    return [response.status, response.data];
  } catch (error) {
    throw error;
  }
};

export const createExChangeRate = async (month, year, jpy, usd, idExRate) => {
  try {
    // if idExRate is null || trim, ''  => create
    if (month < 10) month = "0" + month;
    console.log(year + "-" + month);
    const response = await API.callApi_createExchagerateByMonthAndYear(
      year + "-" + month,
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
    let newCost = formatNumberHasDot(formData.cost);
    formData.cost = newCost;
    const response = await API.callApi_createPayment(formData);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (formData) => {
  try {
    // if idExRate is null || trim, ''  => create
    let newCost = formatNumberHasDot(formData.cost);
    formData.cost = newCost;
    const response = await API.callApi_updatePayment(formData);

    return response;
  } catch (error) {
    throw error;
  }
};
