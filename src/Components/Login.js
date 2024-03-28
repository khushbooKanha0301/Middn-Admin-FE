import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { notificationFail } from "../store/slices/notificationSlice";
import { login } from "../store/slices/AuthenticationSlice";

function Login() {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginUser = () => {
    const req = { userName: email, password: password };
    if (!email) {
      dispatch(notificationFail("Please Enter Email.."));
    } else if (!password) {
      dispatch(notificationFail("Please Enter Password.."));
    } else {
      dispatch(login(req));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loginUser();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser();
  }

  return (
    <>
      <div className="loginPage w-full flex items-center justify-center px-5">
           <div className="common-card max-w-[550px] w-full mx-auto my-0 bg-[#18191D] p-[32px] rounded-[26px]">
                <h2 className="text-lg font-medium leading-6 text-white mb-4">Login Page</h2>
                <form action="" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="" className="text-xs leading-[18px] text-white block mb-2">Email</label>
                        <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} className="bg-[#23262f] text-white text-base w-full font-normal p-4 rounded-2xl border-[none]" value={email} onKeyPress={handleKeyPress}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="text-xs leading-[18px] text-white block mb-2">Password</label>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="bg-[#23262f] text-white text-base w-full font-normal p-4 rounded-2xl border-[none]" value={password} onKeyPress={handleKeyPress} />
                    </div>
                    <div className="flex flex-wrap justify-between items-center">                        
                        <button type="submit" className="GradiantBtn loginBtn">Login</button>
                        <Link to='/forgot-password' className="text-[#7ffc8d] no-underline text-sm">Forgot password?</Link>
                    </div>
                </form>
            </div> 
      </div>
    </>
  );
}

export default Login;
