import actionTypes from "../actions/actionTypes";

const initState = {
  users: [],
  msg: "",
};

const adminUserReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLUSERS:
      return {
        ...state,
        users: action.users || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default adminUserReducer;
