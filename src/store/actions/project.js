import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getProjects = () => async (dispatch) => {
  try {
    console.log("Action creator: getProjects is called");
    const response = await apis.apiGetProjectsById();
    console.log("API Response:", response.data);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PROJECTS_USER,
        projects: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROJECTS_USER,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROJECTS_USER,
      projects: null,
      msg: error,
    });
  }
};

export const getAllProjects = () => async (dispatch) => {
  try {
    const response = await apis.apiGetAllProjects();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALLPROJECTS,
        customers: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALLPROJECTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALLPROJECTS,
      customers: null,
      msg: error,
    });
  }
};
