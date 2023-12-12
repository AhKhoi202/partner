import actionTypes from "./actionTypes";
import * as apis from "../../services";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      currentData: null,
      msg: error,
    });
  }
};

export const getCustomers = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCustomers();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CUSTOMERS,
        customers: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CUSTOMERS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CUSTOMERS,
      customers: null,
      msg: error,
    });
  }
};
export const getAllCustomers = () => async (dispatch) => {
  try {
    const response = await apis.apiGetAllCustomers();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALLCUSTOMERS,
        customers: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALLCUSTOMERS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALLCUSTOMERS,
      customers: null,
      msg: error,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await apis.apiGetAllUsers();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALLUSERS,
        users: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALLUSERS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALLUSERS,
      users: null,
      msg: error,
    });
  }
};
