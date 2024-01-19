// Controller.js
import * as API from '../API';
// import Cookies from 'js-cookie';

export const loginUser = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.login(username, password);
    localStorage.setItem('token',  response.access_token); 
    return response;
  } catch (error) {
    throw error;
  }
};
