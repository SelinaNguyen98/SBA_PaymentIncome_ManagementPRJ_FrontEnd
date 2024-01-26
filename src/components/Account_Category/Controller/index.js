 // Controller.js

import { callAPI_GetAllCategory, callApi_createCategory, callApi_editCategory, callApi_getGroupCategory } from "../API";
import { callAPI_deleteByID } from "../API";

 export const getCategory = async (page, newfilter) => {
   // eslint-disable-next-line no-useless-catch
   try {
     const response = await callAPI_GetAllCategory(
       page,
       newfilter
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
      [id]
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // if idExRate is null || trim, ''  => create
    console.log(formData.name);
    //formData.order_date = format(new Date(formData.order_date), 'dd-MM-yyyy');
    // let newCost = formatNumberHasDot(formData.vnd);
    // formData.vnd = parseFloat(newCost); // Convert to a float
    const response = await callApi_createCategory(formData.name, formData.group_id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGroupCategory = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log(formData.name);
    const response = await callApi_getGroupCategory();
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCategory = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log(formData.name, formData.group_id);
    const response = await callApi_editCategory(formData.id, formData.name, formData.group_id);
    return response;
  } catch (error) {
    throw error;
  }
};
 
 