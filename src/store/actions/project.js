import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getProjects = () => async (dispatch) => {
  try {
    const response = await apis.apiGetProjectsByUser();
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
        projects: response.data.response,
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
      projects: null,
      msg: error,
    });
  }
};
