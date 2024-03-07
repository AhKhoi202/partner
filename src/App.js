import { Routes, Route } from "react-router-dom";
import { Home, ResetPassword, ForgotPassword } from "./containers/public";
import { System, ListCustomers } from "./containers/system";
import { Profile, EditAccount } from "./containers/profile";
import KinhBet from "./containers/kinhBet/KinhBet";
import {
  AllCustomers,
  ListPartner,
  ListProjects,
  PaymentPartner,
  PaymentProject,
  ProjectDetail,
  RevenueStatistics,
  PaidStatistics,
} from "./containers/system/admin";
import {
  ListCustomer,
  ViewProjects,
  PotentialCustomers,
} from "./containers/public/navbar";
import { CreateProject } from "./containers/public/projects";
import { Login, Register, Homepage } from "./containers/public/pages";
import { path } from "./ultils/constant";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [dispatch, isLoggedIn]);
  return (
    <div className="bg-gray-300">
      <Routes>
        <Route path={path.KINGBET} element={<KinhBet />} />
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={path.RESETPASSWORD} element={<ResetPassword />} />
          <Route path={path.DS_KHACH_HANG} element={<ListCustomer />} />
          <Route path={path.TAO_DU_AN} element={<CreateProject />} />
          <Route path={path.DU_AN} element={<ViewProjects />} />
          <Route
            path={path.KHACH_HANG_TIEM_NANG}
            element={<PotentialCustomers />}
          />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.LIST_CUSTOMERS} element={<ListCustomers />} />
          <Route path={path.LIST_ALLCUSTOMERS} element={<AllCustomers />} />
          <Route path={path.LIST_PARTNER} element={<ListPartner />} />
          <Route path={path.LIST_PROJECTS} element={<ListProjects />} />
          <Route path={path.PROJECTS_DETAIL} element={<ProjectDetail />} />
          <Route path={path.PAYMENT_PARTNER} element={<PaymentPartner />} />
          <Route path={path.PAYMENT_PROJECT} element={<PaymentProject />} />
          <Route
            path={path.REVENUE_STATISTICS}
            element={<RevenueStatistics />}
          />
          <Route path={path.PAID_STATISTICS} element={<PaidStatistics />} />
        </Route>

        <Route path={path.PROFILE} element={<Profile />}>
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
