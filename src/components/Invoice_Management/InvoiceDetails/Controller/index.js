// Controller.js
import * as API from "../API";
// import Cookies from 'js-cookie';

export const getPaymentsByYearAndMonths = async (month, year, page) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_PaymentsYearAndMonths(month, year, page);

    // Save the token to a cookie
    // Cookies.set('token', response.access_token, { expires: 7 }); // Token expires in 2 days

    // You can perform additional actions with the response if needed
    return response;
  } catch (error) {
    throw error;
  }
};
