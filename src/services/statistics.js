import axios from "../axiosConfig";

//api lấy thống kê theo năm
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
// lấy thống kê nhận tiền project theo tháng
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
//===============================PARTNER
export const getPaymentPartner = async (year) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/statistics/get-statistics-partner?year=${year}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// lấy thống kê nhận tiền project theo tháng
export const getPaymentPartnerByMonth = async (month, year) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/statistics/get-statistics-payment-partner?month=${month}&year=${year}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};