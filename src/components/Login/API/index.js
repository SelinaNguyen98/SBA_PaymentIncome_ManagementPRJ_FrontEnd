// API.js
// import axios from "axios";
import axios from "axios";
import { paths } from "../../../Utils/utils/configAxios";

// const API_BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(paths.LOGIN, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};