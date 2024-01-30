import * as API from "../API";

export const getPaymentsByYearAndMonths = async (y) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await API.callAPI_GetdataPL(
      y
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getFileExportExcel_PL = async (y)=>{
  try {
    const response = await API.callAPI_ExportPL(
      y
    );
    return response;
  }catch (error) {
    throw error;
  }
}