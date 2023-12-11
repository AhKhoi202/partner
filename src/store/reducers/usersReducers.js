import actionTypes from "../actions/actionTypes";

const initState = {
  users: [],
  msg: "",
};

const usersReducers = (state = initState, action) => {
    switch (action.type) {
      case actionTypes.GET_USERS:
        return {
          ...state,
          customers: action.users || [],
          msg: action.msg || ''
        }
      default:
          return state;
    }
  }

  export default usersReducers