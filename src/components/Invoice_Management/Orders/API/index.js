/* eslint-disable no-useless-catch */
// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

export const callAPI_GetOrder = async (month, year, page) => {
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.get(paths.GET_ORDER_MONTH_YEAR, {
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