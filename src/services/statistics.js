import axios from "../axiosConfig";

export const apiGetStatistics = async (year) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/statistics/get-statistics-project?year=${year}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getPaymentProjectByMonth = async (month, year) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/statistics/get-statistics-payment-project?month=${month}&year=${year}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
