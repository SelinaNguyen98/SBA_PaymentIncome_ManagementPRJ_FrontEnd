// Controller.js
import * as API from '../API';
// import Cookies from 'js-cookie';

export const loginUser = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.login(username, password);

    // Save the token to a cookie
    // Cookies.set('token', response.access_token, { expires: 7 }); // Token expires in 2 days
    localStorage.setItem('token',  response.access_token); 
    // You can perform additional actions with the response if needed
    return response;
  } catch (error) {
    throw error;
  }
};