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
};

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
export const apiPostProjectProgress = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/v1/project/post-project-progress",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetProjectProgress = async (projectId) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/project/get-project-progress/${projectId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiEditProject = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/project/put-project",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiPostDiscount = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/v1/project/post-discount",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const apiGetDiscountByProjectId = async (projectId) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/project/get-discount-by-project/${projectId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const apiGetDiscountById = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/v1/project/get-discount-by-id/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiEditDiscount = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/project//put-referral-bonuses",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
