// frontend/src/controllers/invoiceController.js
import * as API from '../API/';

export const getInvoiceData = async (category, searchTerm) => {
  try {
    const invoiceData = await invoiceApi.fetchInvoiceData(category, searchTerm);
    // You can perform additional actions with the data if needed
    return invoiceData;
  } catch (error) {
    console.error('Error getting invoice data:', error);
    throw error;
  }
};
