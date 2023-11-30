import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// chinh sua thong tin nguoi dung
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });


// them khachs hang tiem nang
export const apiCreateCustomers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/user/new-customers",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });


  // hien thi thong tin khach hang
  export const apiGetCustomers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-customers",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });