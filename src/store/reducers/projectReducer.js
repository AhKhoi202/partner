import actionTypes from "../actions/actionTypes";

const initialState = {
  projects: [],
  msg: "",
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECTS_USER:
      return {
        ...state,
        projects: action.projects || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};
export default projectReducer;