import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";
import jwtAxios from "../../service/jwtAxios";
import { useNavigate } from "react-router-dom";
import ForgotPasswordOTP from "./ForgotPasswordOTP";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("admin@middn.com");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [sendButtonLabel,setSendButtonLabel] = useState("Send");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = async (e) => {
    e.preventDefault();
    const req = { userName: email };
    if (!email) {
      dispatch(notificationFail("Please Enter Email"));
    } else {
      setIsDisabled(true);
      setSendButtonLabel("Sending");
      await jwtAxios
        .post(`/auth/forgotpassword`, { email: req?.userName })
        .then((res) => {
          setSendButtonLabel("Send");
          setIsDisabled(false);
          dispatch(notificationSuccess(res?.data?.message));
          setIsModalOpen(true);
        })
        .catch((error) => {
          setIsDisabled(false);
          setSendButtonLabel("Send");
          if(typeof error == "string")
          {
            dispatch(notificationFail(error));
          }else{
            dispatch(notificationFail(error?.response?.data?.message));
          }
        });
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="loginPage w-full flex items-center justify-center px-5">
        <div className="common-card max-w-[550px] w-full mx-auto my-0 bg-[#18191D] p-[32px] rounded-[26px]">
            <h2 className="text-lg font-medium leading-6 text-white mb-4">Forgot Password</h2>
            <form onSubmit={openModal}>
                <div className="mb-4">
                    <label htmlFor="" className="text-xs leading-[18px] text-white block mb-2">Email</label>
                    <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} className="bg-[#23262f] text-white text-base w-full font-normal p-4 rounded-2xl border-[none]" value={email} />
                </div>
                <div className="flex flex-wrap items-center">                        
                    <button disabled={isDisabled} type="submit" className="GradiantBtn loginBtn">{sendButtonLabel}</button>
                    <button type="button" onClick={() => navigate(-1)} className="BackBtn ml-[8px]">Back</button>
                </div>
            </form>
        </div> 
        <ForgotPasswordOTP
          isOpen={isModalOpen}
          onClose={closeModal}
          email={email}
      />
    </div>
  );
};

export default ForgotPasswordComponent;
