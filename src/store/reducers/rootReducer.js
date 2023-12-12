import authReducer from "./authReducer";
import userReducer from "./userReducers";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import customerReducer from "./customerReducer";
import allCustomerReducer from "./allCustomerReducer";
import allUsersReducer from "./allUsersReducer"

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']

}

const rootReducer = combineReducers({
    auth: persistReducer (authConfig, authReducer),
    user: userReducer,
    customer: customerReducer,
    allCustomer: allCustomerReducer,
    allUsers: allUsersReducer
})
export default rootReducer