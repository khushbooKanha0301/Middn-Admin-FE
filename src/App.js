import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "./assets/scss/style.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserList from "./Components/UserList/UserList";
import KycList from "./Components/KycList/KycList";
import ReportUserList from "./Components/ReportUser/ReportUserList";
import ReportedUser from "./Components/ReportUser/ReportedUser";
import ManageEscrow from "./Components/ManageEscrow/ManageEscrow";
import ManageEscrowDetails from "./Components/ManageEscrow/ManageEscrowDetails";
import ManageEscrowDetailsUser from "./Components/ManageEscrow/ManageEscrowDetailsUser";

import Deposit from "./Components/Deposit/Deposit";
import Withdraw from "./Components/Withdraw/Withdraw";
import Header from "./Components/Header/Header";
import Notification from "./Components/Notification/Notification";
import UserDetails from "./Components/UserList/UserDetails";
import UserDepositHistory from "./Components/UserList/UserDepositHistory";
import TransactionLogs from "./Components/UserList/TransactionLogs";
import UserLoginHistory from "./Components/UserList/UserLoginHistory";
import SnackBar from "./snackBar";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordComponent from "./Components/ForgotPassword/ForgotPasswordComponent";
import ResetPasswordComponent from "./Components/ForgotPassword/ResetPasswordComponent";
import { useJwt } from "react-jwt";
import { useEffect } from "react";
import { setSAL } from "./store/slices/AuthenticationSlice";

function App() {
  const authToken =
    useSelector((state) => state.authenticationReducer?.authToken) || null;
  let roleId =
    useSelector((state) => state.authenticationReducer?.roleId) || null;
  roleId = Number(roleId);
  const token = localStorage.getItem("token") || "";
  const { decodedToken } = useJwt(token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (decodedToken && roleId) {
      dispatch(setSAL(decodedToken.access));
    }
  }, [decodedToken, roleId]);

  const SAL = useSelector((state) => state.authenticationReducer?.SAL) || null;

  return (
    <>
      <div className="bg-[#131517]">
        <div className="customContainer mx-auto flex min-h-screen">
          <ToastContainer />
          <SnackBar />
          <Router>
            {!authToken && (
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordComponent />}
                />
                <Route
                  path="/reset-password"
                  element={<ResetPasswordComponent />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )}
            {roleId === 1 && authToken && (
              <>
                <Sidebar roleId={roleId} />
                <div className="allPages">
                  <Header />
                  <div className="pagescontent py-8 px-[62px]">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/userlist" element={<UserList />} />
                      <Route
                        path="/reportUsersList"
                        element={<ReportUserList />}
                      />
                      <Route
                        path="/reportedUser/:address"
                        element={<ReportedUser />}
                      />
                      <Route path="/kyclist" element={<KycList />} />
                      <Route path="/manageescrow" element={<ManageEscrow />} />
                      <Route
                        path="/manageescrowdetails"
                        element={<ManageEscrowDetails />}
                      />
                      <Route path="/deposit" element={<Deposit />} />
                      <Route path="/withdraw" element={<Withdraw />} />
                      <Route path="/notification" element={<Notification />} />
                      <Route
                        path="/userdetails/:id"
                        element={<UserDetails />}
                      />
                      <Route
                        path="/transactionlogs"
                        element={<TransactionLogs />}
                      />
                      <Route
                        path="/userdeposithistory"
                        element={<UserDepositHistory />}
                      />
                      <Route
                        path="/manageescrowdetailsUser"
                        element={<ManageEscrowDetailsUser />}
                      />
                      <Route
                        path="/userloginhistory/:id"
                        element={<UserLoginHistory />}
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </div>
                </div>
              </>
            )}
            {roleId === 2 && authToken && (
              <>
                <Sidebar roleId={roleId} />
                <div className="allPages">
                  <Header />
                  <div className="pagescontent py-8 px-[62px]">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/userlist" element={<UserList />} />
                      <Route path="/manageescrow" element={<ManageEscrow />} />
                      <Route
                        path="/manageescrowdetails"
                        element={<ManageEscrowDetails />}
                      />
                      <Route path="/notification" element={<Notification />} />
                      <Route
                        path="/userdetails/:id"
                        element={<UserDetails />}
                      />

                      <Route
                        path="/userdeposithistory"
                        element={<UserDepositHistory />}
                      />
                      <Route
                        path="/manageescrowdetailsUser"
                        element={<ManageEscrowDetailsUser />}
                      />
                      <Route
                        path="/userloginhistory/:id"
                        element={<UserLoginHistory />}
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </div>
                </div>
              </>
            )}
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
