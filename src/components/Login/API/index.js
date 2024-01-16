// API.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
