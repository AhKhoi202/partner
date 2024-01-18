import actionTypes from "../actions/actionTypes";

const initState = {
  customers: [],
  msg: "",
};

const adminCustomerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLCUSTOMERS:
      return {
        ...state,
        customers: action.customers || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

  export default adminCustomerReducer;