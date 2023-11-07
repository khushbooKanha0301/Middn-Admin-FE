import React, { useEffect, useRef, useState } from "react";
import jwtAxios from "../../service/jwtAxios";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import close from "../../assets/images/close.svg"

const DigitInput = styled.input`
  width: 30px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  border: none;
  border-bottom: 2px solid #000;
  margin: 0 5px;
  outline: none;
`;
const ForgotPasswordOTP = ({isOpen,onClose,email}) => {
  const [secret, setSecret] = useState("");
  const [otpValue, setOTPValue] = useState("");
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [numIndex, setNumIndex] = useState("");
  const [lastAttemptTime, setLastAttemptTime] = useState("");
  const [invalidAttempts, setInvalidAttempts] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (numIndex === 5 && otpValue.length === 6) {
      makeAPICall();
    }
  }, [numIndex, otpValue]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otpValue[index]) {
      e.preventDefault();
      setOTPValue((prevOTP) => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index - 1] = "";
        return updatedOTP.join("");
      });
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOTPValue((prevOTP) => {
      const updatedOTP = [...prevOTP];
      updatedOTP[index] = value.charAt(value.length - 1);
      return updatedOTP.join("");
    });
    setNumIndex(index);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const makeAPICall = async () => {
    if (!otpValue) {
      dispatch(notificationFail("Please Enter Code"));
    } else {
      if (otpValue.length !== 6) {
        dispatch(notificationFail("Please Enter Valid Code"));
      } else {
        const now = new Date().getTime();
        const invalidAttempts1 = Number(invalidAttempts) || 0;
        const lastAttemptTime1 = Number(lastAttemptTime) || 0;

        if (invalidAttempts1 >= 3 && now - lastAttemptTime1 < 5 * 60 * 1000) {
          dispatch(notificationFail("You can try again after 5 minutes"));
          setTimeout(() => {
            setLastAttemptTime("");
            setError("");
            inputRefs.current[0]?.focus();
          }, 300000);
          setError("You can try again after 5 minutes");
          setOTPValue("");
          inputRefs.current[0]?.focus();
          return;
        }

        await jwtAxios
          .post("/auth/checkOTP", { otp: otpValue, email: email })
          .then((res) => {
            onClose();
            dispatch(notificationSuccess(res.data?.message));
            navigate("/reset-password", { state: { email: email } });
          })
          .catch(() => {
            if (now - lastAttemptTime1 >= 5 * 60 * 1000) {
              setInvalidAttempts(1);
              setLastAttemptTime(now);
            } else {
              setInvalidAttempts(invalidAttempts1 + 1);
            }
            dispatch(notificationFail("Invalid OTP"));
            setOTPValue("");
            inputRefs.current[0]?.focus();
          });
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedOTP = e.clipboardData.getData("text/plain");
    if (/^\d+$/.test(pastedOTP) && pastedOTP.length <= 6) {
      const updatedOTP = pastedOTP.slice(0, 6).split("");
      const initialOTP = Array.from({ length: 6 }, (_, index) =>
        index < updatedOTP.length ? updatedOTP[index] : ""
      );
      setOTPValue(initialOTP.join(""));
      setNumIndex(updatedOTP.length - 1);
      if (inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
    }
  };

  return (
    <Dialog
        open={isOpen}
        // handler={onClose}
        className="bg-[#1E1F24] rounded-[24px] px-6 sm:px-8 py-[38px] max-w-[570px] relative DepositDetailsPopup"
      >
        <DialogHeader className="items-start flex flex-wrap justify-between mb-6 p-0 pr-9 gap-3">
          <h3 className="text-white">
            Enter OTP
          </h3>
        </DialogHeader>
        <DialogBody divider className="text-center border-none p-0">
          {Array.from({ length: 6 }, (_, index) => (
            <DigitInput
              key={index}
              type="text"
              value={otpValue[index] || ""}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="digit-input"
              disabled={error}
            />
          ))}
        <br />
        {error && (
          <p style={{ color: "#f76161", marginTop: "10px" }}>{error}</p>
        )}
      </DialogBody>
      <DialogFooter className="absolute top-[40px] right-8 p-0">
        <Button
          variant="text"
          onClick={onClose}   
          className="p-0"       
        >
          <img src = {close} alt="img" /> 
        </Button>
        </DialogFooter>
    </Dialog>
  );
};

export default ForgotPasswordOTP;
