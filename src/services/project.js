import axios from "../axiosConfig";

export const apiCreateProject = async (payload, customerId) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/v1/project/new-project/${customerId}`,
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetCustomerById = async (customerId) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/project/get-customer/${customerId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};