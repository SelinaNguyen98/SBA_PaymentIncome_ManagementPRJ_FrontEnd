// Controller.js
import * as API from '../API';
// import Cookies from 'js-cookie';

export const loginUser = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.login(username, password);
    console.log(response.user.id);
    localStorage.setItem('token',  response.access_token); 
    localStorage.setItem('user_id',  response.user.id); 
    return response;
  } catch (error) {
    throw error;
  }
};