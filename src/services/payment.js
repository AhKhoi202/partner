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

export const apiGetPaymentStages = async (referralBonusesId) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/payment/get-payment/${referralBonusesId}`,
    });
    return response; // Trả về dữ liệu từ response
  } catch (error) {
    throw error;
  }
};

export const apiDeletePaymentStages = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: "/api/v1/payment/delete-payment-stages",
      data: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiUpdatePaymentStages = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/payment/put-payment-stages",
      data: {
        payload,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
