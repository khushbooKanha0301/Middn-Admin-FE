import React, { useEffect, useState } from "react";
import jwtAxios from "../../service/jwtAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";

const ResetPasswordComponent = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = location.state || {};
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      resetPassword();
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault()
    const req = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      email: email,
    };
    if (!newPassword) {
      dispatch(notificationFail("Please Enter New Password.."));
    } else if (!confirmPassword) {
      dispatch(notificationFail("Please Enter Confirm Password.."));
    } else if (newPassword !== confirmPassword) {
      dispatch(notificationFail("Password and Confirm password Not Matched"));
    } else {
      await jwtAxios
        .post(`/auth/resetPassword`, req)
        .then((res) => {
          dispatch(notificationSuccess(res?.data?.message));
          navigate("/");
        })
        .catch((error) => {
          if(typeof error == "string")
          {
            dispatch(notificationFail(error));
          }else{
            dispatch(notificationFail(error?.response?.data?.message));
            if(error?.response?.data?.message == "Token Expired.")
            {
              navigate("/");
            }
          }
          setConfirmPassword("");
          setNewPassword("");
        });
    }
  };

  return (
    <div className="loginPage w-full flex items-center justify-center px-5">
           <div className="common-card max-w-[550px] w-full mx-auto my-0 bg-[#18191D] p-[32px] rounded-[26px]">
                <h2 className="text-lg font-medium leading-6 text-white mb-4">Reset Password</h2>
                <form action="" onSubmit={resetPassword}>
                    <div className="mb-4">
                        <label htmlFor="" className="text-xs leading-[18px] text-white block mb-2">New Password</label>
                        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className="bg-[#23262f] text-white text-base w-full font-normal p-4 rounded-2xl border-[none]" value={newPassword} onKeyPress={handleKeyPress}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="text-xs leading-[18px] text-white block mb-2">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="bg-[#23262f] text-white text-base w-full font-normal p-4 rounded-2xl border-[none]" value={confirmPassword} onKeyPress={handleKeyPress} />
                    </div>
                    <div className="flex flex-wrap items-center">                        
                        <button type="submit" className="GradiantBtn loginBtn">Save</button>
                        <button type="button" onClick={() => navigate('/')} className="BackBtn ml-[8px]">Cancel</button>
                    </div>
                </form>
            </div> 
      </div>
  );
};

export default ResetPasswordComponent;
