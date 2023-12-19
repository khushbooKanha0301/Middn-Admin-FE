import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jwtAxios from "../../service/jwtAxios";
import { notificationFail } from "../../store/slices/notificationSlice";
import Pagination from "../Pagination";
import { getDateFormate } from "../../utils";

function UserLoginHistory() {   
  const tablehead = [
    "User",
    "Login At",
    "IP",
    "Location",
    "Browser|OS"
  ];
  const PageSize = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loginHistoryCount, setLoginHistoryCount] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserLoginHistory = async () => {
    await jwtAxios
    .get(`/users/getLoginHistory/${id}?page=${currentPage}&pageSize=${PageSize}`)
    .then((response) => {
      if(response.status == 200)
      {
        setLoginHistory(response?.data?.loginHistory);
        setLoginHistoryCount(response?.data?.loginHistoryCount);
      }else{
        navigate("/");
        notificationFail("Something went wrong");
      }
    })
    .catch((e) => {
      navigate("/");
      dispatch(notificationFail("Something went wrong"));
    });
  }

  useEffect(() => {
    if(id)
    {
      getUserLoginHistory();
    }
  },[id,currentPage])

  return (
    <>
    <div className="userLoginHistory">
      <h1 className="maintitle">User Login History</h1>
      <div className="common-table overflow-x-auto">
      <table className="w-[740px] lg:w-full">
          <thead>
            <tr>
              {tablehead.map((item, index) => (
                <th
                  className="text-white text-center text-xs font-bold leading-5 py-[18px] px-[10px] align-middle w-[12.5%] bg-[#18191D]"
                  key={index}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((item, index) => (
              <tr key={index}>
                <>
                  <td>{item.user_name}</td>
                  <td>{getDateFormate(item.login_at)}</td>
                  <td>{item.ip_address}</td>
                  <td>{item.location}</td>                  
                  <td><p className="text-right pr-[25px] lg:pr-[30px] xl:pr-[45px]">{item.browser.split(" ")[0]}<span className="block text-right">{item.browser.split(" ")[1]}</span></p></td>                  
                </>
              </tr>
            ))}
            {!loginHistory.length && 
              <tr>
                <td></td>
                <td colSpan={3} className="text-center">User haven't any login history records</td>
                <td></td>
              </tr>
          }
          </tbody>
        </table>
        <Pagination
            currentPage={currentPage}
            totalCount={loginHistoryCount}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
           />
      </div>
    </div>
    </>
  );
}

export default UserLoginHistory;
