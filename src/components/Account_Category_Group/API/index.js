// frontend/src/api/invoiceApi.js
import axios from 'axios';
import { paths } from "../../../Utils/utils/configAxios"

//const API_BASE_URL = 'http://127.0.0.1:8000/api'; // 

//const api = axios.create({
 // baseURL: `${API_BASE_URL}/invoice`, 
 // headers: {
  //  'Content-Type': 'application/json',
//  },
//});

export const callAPI_GetAllGroup = async (page) => {
  try {
    const response = await axios.get(paths.GROUP, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//export const fetchInvoiceData = async (category, searchTerm) => {
  //try {
    //const response = await api.get('/', {
      //params: {
        //category,
        //searchTerm,
     // },
    //});
    //return response.data;
  //} catch (error) {
    //console.error('Error fetching invoice data:', error);
    //throw error;
  //}
//};
