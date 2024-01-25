// Controller.js
import * as API from "../API";
import { formatNumberHasDot } from "../../../../Utils/utils/maths";
// eslint-disable-next-line no-unused-vars
// import { format } from 'date-fns';

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

// File Controller
export const createOrder = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // if idExRate is null || trim, ''  => create
    console.log(formData.order_date);
    //formData.order_date = format(new Date(formData.order_date), 'dd-MM-yyyy');
    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseFloat(newCost); // Convert to a float
    const response = await API.callApi_createOrder(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (formData) => {
  console.log(formData);
  // eslint-disable-next-line no-useless-catch
  try {
    // // if idExRate is null || trim, ''  => create
    // formData.order_date = format(new Date(formData.order_date), 'dd-MM-yyyy');

    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseFloat(newCost); 
    console.log( "formData/" , formData);
    const response = await API.callApi_updateOrder(formData);

    return response;
  } catch (error) {
    throw error;
  }
};

//Payment
export const getPaymentByYearAndMonths = async (selectedDate, current_page) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const year = selectedDate.getFullYear();
    
    const response = await API.callAPI_Get_Payment_Order(month, year, current_page);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePaymentByIds = async (paymentIds) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_Delete_Payment_Order(paymentIds);
    return response;
  } catch (error) {
    throw error;
  }
};

// File Controller
export const createPayment = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // if idExRate is null || trim, ''  => create
    console.log(formData.payment_date);
    //formData.order_date = format(new Date(formData.order_date), 'dd-MM-yyyy');
    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseInt(newCost); // Convert to a float
    const response = await API.callApi_Create_Payment_Order(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (formData) => {
  console.log(formData);
  // eslint-disable-next-line no-useless-catch
  try {
    // // if idExRate is null || trim, ''  => create
    // formData.order_date = format(new Date(formData.order_date), 'dd-MM-yyyy');

    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseInt(newCost); 
    console.log( "formData/" , formData);
    const response = await API.callApi_Update_Payment_Order(formData);
    return response;
  } catch (error) {
    throw error;
  }
};


//Outsourcing
export const getOutsourcingByYearAndMonths = async (selectedDate, current_page) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const year = selectedDate.getFullYear();
    
    const response = await API.callAPI_Get_Outsourcing(month, year, current_page);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteOutsourcingByIds = async (outsourcingIds) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_Delete_Outsourcing(outsourcingIds);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createOutsourcing = async (formData) => {
  try {
    console.log(formData.outsourced_date);
    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseInt(newCost); // Convert to a float
    const response = await API.callApi_Create_Outsourcing(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateOutsourcing = async (formData) => {
  console.log(formData);
  try {
    let newCost = formatNumberHasDot(formData.vnd);
    formData.vnd = parseInt(newCost); 
    console.log( "formData/" , formData);
    const response = await API.callApi_Update_Outsourcing(formData);
    return response;
  } catch (error) {
    throw error;
  }
};