import axios from "../axiosConfig";

export const apiGetCurrent = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/user/get-current",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateUser = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/user/",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiCreateCustomers = async (payload) => {
  console.log(payload)
  try {
    const response = await axios({
      method: "post",
      url: "/api/v1/user/new-customers",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteCustomers = async (customerId) => {
  try {
    const response = await axios({
      method: "delete",
      url: "/api/v1/user/delete-customer",
      data: {
        id: customerId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const apiDeleteUsers = async (userId) => {
  try {
    const response = await axios({
      method: "delete",
      url: "/api/v1/user/delete-user",
      data: {
        id: userId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiEditCustomers = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/user/edit-customer",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetCustomers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/user/get-customers",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetAllCustomers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/user/get-Allcustomers",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetAllUsers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/user/get-Allusers",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiEditUsers = async (payload) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/v1/user/edit-user",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiForgorPassword = async (email) => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/v1/user/forgot-password",
      params: { email },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiResetPassword = async (token, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/v1/user/reset-password/" + token, 
      data: {
        password: password, 
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};