import axios from "../axiosConfig";

export const apiCreateProject = async (payload, customerId) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/v1/project/new-project`,
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

export const apiGetProjectsById = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/project/get-projects",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const apiGetAllProjects = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/project/get-all-projects",
    });
    return response;
  } catch (error) {
    throw error;
  }
};