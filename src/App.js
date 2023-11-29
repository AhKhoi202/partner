import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Process,
  PotentialCustomers,
} from "./containers/public";
import { path } from "./ultils/constant";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { System, EditAccount } from "./containers/system";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.TIEN_DO_CONG_VIEC} element={<Process />} />
          <Route
            path={path.KHACH_HANG_TIEM_NANG}
            element={<PotentialCustomers />}
          />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>

          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />  
        </Route>
      </Routes>
    </div>
  );
}

export default App;