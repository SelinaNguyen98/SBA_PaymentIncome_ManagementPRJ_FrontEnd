// frontend/src/api/invoiceApi.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // 

const api = axios.create({
  baseURL: `${API_BASE_URL}/invoice`, // Assuming your API has an endpoint like /api/invoice
  headers: {
    'Content-Type': 'application/json',
    // Include any other headers you might need
  },
});

export const fetchInvoiceData = async (category, searchTerm) => {
  try {
    const response = await api.get('/', {
      params: {
        category,
        searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice data:', error);
    throw error;
  }
};
