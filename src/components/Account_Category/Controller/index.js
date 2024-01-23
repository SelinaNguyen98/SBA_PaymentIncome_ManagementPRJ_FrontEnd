 // Controller.js

import { callAPI_GetAllCategory } from "../API";
import { callAPI_deleteByID } from "../API";

 export const getCategory = async (page) => {
   // eslint-disable-next-line no-useless-catch
   try {
     const response = await callAPI_GetAllCategory(
       page
     );
     return response;
   } catch (error) {
     throw error;
   }
 };

 export const deleteCategory = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await callAPI_deleteByID(
      id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//  export const deletePaymentById = async (id) => {
//    // eslint-disable-next-line no-useless-catch
//    try {
//      const response = await API.callApi_deletePaymentByID(id);
//      return response;
//    } catch (error) {
//      throw error;
//    }
//  };
 
 