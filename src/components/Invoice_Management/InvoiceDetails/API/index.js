/* eslint-disable no-useless-catch */
// API.js
import axios from "axios";
import { paths } from "../../../../Utils/utils/configAxios";

export const callAPI_GetPaymentsYearAndMonths = async (
  month,
  year,
  page,
  controller,
  key,
  direction
) => {
  try {
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const { signal } = controller;
    const response = await axios.get(
      paths.GET_PAYMENTS_MONTH_YEAR,
      // {
      //   signal: controller.signal,
      // },
      {
        params: {
          month,
          year,
          page,
          key,
          direction,
        },
        signal,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_deletePaymentByID = async (ids) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(ids);
    // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
    const response = await axios.delete(paths.PAYMENT, {
      data: { id: ids },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callAPI_DeleteListInvoice = async (invoiceIds) => {
  try {
    const response = await axios.delete(paths.PAYMENT, {
      data: { id: invoiceIds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_getExchagerateByMonthAndYear = async (
  month,
  year,
  controller
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { signal } = controller;
    console.log("Param obbjec", month, year);
    const response = await axios.get(paths.EXCHAGE_RATE, {
      params: {

        month,
        year,
      },
      signal,
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const callApi_ExchagerateByMonthAndYear = async (month, year) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     // const response = await axios.get(paths.GET_PAYMENTS_MONTH_YEAR, config);
//     const response = await axios.get(`categories/11`);
//     // console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const callApi_createExchagerateByMonthAndYear = async (
  monthYear,
  jpy,
  usd,
  idExRate
) => {
  try {
    const response = await axios.post(paths.EXCHAGE_RATE, {
      id: idExRate != null ? idExRate : null,
      exchangeDate: monthYear,
      jpy: jpy,
      usd: usd,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callAPI_GetAllCategoriesPL = async () => {
  try {
    const response = await axios.get(paths.CATEGORY_ALL);

    return response.data?.categories;
  } catch (error) {
    throw error;
  }
};

export const callApi_createPayment = async (formData) => {
  try {
    console.log("formData", formData);

    const response = await axios.post(paths.PAYMENT, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const callApi_updatePayment = async (formData) => {
  try {
    const response = await axios.put(
      paths.PAYMENT + `/${formData.id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
