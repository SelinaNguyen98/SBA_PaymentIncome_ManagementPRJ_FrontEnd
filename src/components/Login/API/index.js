// API.js
import axios from "axios";
import { paths } from "../../../Utils/utils/configAxios";

export const login = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(paths.LOGIN, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
