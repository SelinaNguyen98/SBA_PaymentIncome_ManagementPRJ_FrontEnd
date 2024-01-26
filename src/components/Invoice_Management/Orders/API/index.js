/* eslint-disable no-useless-catch */
// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

// Create a cancel token source
// Change from const to let
let cancelTokenSource = axios.CancelToken.source();

export const callAPI_GetOrder = async (month, year, page) => {
  try {
    // Cancel the previous request if it exists
    cancelTokenSource.cancel("Operation canceled due to new request.");

    // Create a new cancel token source
    const newCancelTokenSource = axios.CancelToken.source();
    cancelTokenSource = newCancelTokenSource; // Reassign using let

    const response = await axios.get(paths.GET_ORDER_MONTH_YEAR, {
      params: { month, year, page },
      cancelToken: newCancelTokenSource.token, // Set the cancel token for this request
    });

    return response.data;
  } catch (error) {
    // Check if the request was canceled
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};


export const callApi_getExchagerateByMonthAndYear = async (month, year) => {
  try {
    // Cancel the previous request if it exists
    cancelTokenSource.cancel("Operation canceled due to new request.");

    // Create a new cancel token source
    const newCancelTokenSource = axios.CancelToken.source();
    cancelTokenSource = newCancelTokenSource; // Reassign using let

    const response = await axios.get(paths.EXCHAGE_RATE, {
      params: { month, year },
      cancelToken: newCancelTokenSource.token, // Set the cancel token for this request
    });

    return response.data;
  } catch (error) {
    // Check if the request was canceled
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};

export const callAPI_DeleteOrder = async (orderIds) => {
  try {
    const response = await axios.delete(paths.DELETE_ORDER, {
      data: { id: orderIds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const callApi_createOrder = async (formData) => {
  try {
    console.log("formData", formData);
    const response = await axios.post(paths.CREATE_ORDER, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_updateOrder = async (formData) => {
  try {
    const response = await axios.put(
      paths.UPDATE_ORDER + `/${formData.id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};



//Payment_Order:
let paymentOrderCancelTokenSource = axios.CancelToken.source();

export const callAPI_Get_Payment_Order = async (month, year, page) => {
  try {
    // Cancel the previous request if it exists
    paymentOrderCancelTokenSource.cancel("Operation canceled due to new request.");

    // Create a new cancel token source
    const newCancelTokenSource = axios.CancelToken.source();
    paymentOrderCancelTokenSource = newCancelTokenSource; // Reassign using let

    const response = await axios.get(paths.PAYMENT_ORDERS, {
      params: { month, year, page },
      cancelToken: newCancelTokenSource.token, // Set the cancel token for this request
    });

    return response.data;
  } catch (error) {
    // Check if the request was canceled
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};

export const callAPI_Delete_Payment_Order = async (paymentIds) => {
  try {
    const response = await axios.delete(paths.PAYMENT_ORDERS, {
      data: { id: paymentIds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const callApi_Create_Payment_Order = async (formData) => {
  try {
    console.log("formData", formData);
    const response = await axios.post(paths.PAYMENT_ORDERS, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_Update_Payment_Order = async (formData) => {
  try {
    const response = await axios.put(
      paths.PAYMENT_ORDERS + `/${formData.id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


//Outsourcing

// Create a cancel token source
let outsourcingCancelTokenSource = axios.CancelToken.source();

export const callAPI_Get_Outsourcing = async (month, year, page) => {
  try {
    // Cancel the previous request if it exists
    outsourcingCancelTokenSource.cancel("Operation canceled due to new request.");

    // Create a new cancel token source
    const newCancelTokenSource = axios.CancelToken.source();
    outsourcingCancelTokenSource = newCancelTokenSource; // Reassign using let

    const response = await axios.get(paths.OUTSOURCING, {
      params: { month, year, page },
      cancelToken: newCancelTokenSource.token, // Set the cancel token for this request
    });

    return response.data;
  } catch (error) {
    // Check if the request was canceled
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};

export const callAPI_Delete_Outsourcing = async (outsourcingIds) => {
  try {
    const response = await axios.delete(paths.OUTSOURCING, {
      data: { id: outsourcingIds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const callApi_Create_Outsourcing = async (formData) => {
  try {
    console.log("formData", formData);
    const response = await axios.post(paths.OUTSOURCING, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_Update_Outsourcing = async (formData) => {
  try {
    const response = await axios.put(
      paths.OUTSOURCING + `/${formData.id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
