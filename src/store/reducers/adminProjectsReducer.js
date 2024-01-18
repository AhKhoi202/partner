import actionTypes from "../actions/actionTypes";

const initState = {
  projects: [],
  msg: "",
};

const adminProjectsReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLPROJECTS:
      return {
        ...state,
        projects: action.projects || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default adminProjectsReducer;
