import axios from "../axiosConfig";

export const apiCreatePaymentStages = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/v1/payment/post-payment-stages`,
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetPaymentStages = async () => {
  try {
    const response = await axios.get(`/api/v1/payment/get-payment`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    throw error;
  }
};