import actionTypes from "../actions/actionTypes";

const initState = {
  customers: [],
  msg: "",
};

const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS:
      return {
        ...state,
        customers: action.customers || [],
        msg: action.msg || ''
      }
    default:
        return state;
  }
}

export default customerReducer
