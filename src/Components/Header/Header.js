import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../assets/images/message.svg";
import NotificationIcon from "../../assets/images/notification.svg";
import { LogoutIcon } from "../SVGIcon";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/AuthenticationSlice";

function Header() {

  // Sticky Header Start
  const [scrolltopdata, setScrollTopData] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 15) {
        setScrollTopData("");
      } else {
        setScrollTopData("headerHidden");
      }
    });
  }, []);
  const headerStyle = scrolltopdata === "headerHidden" ? { top: "-100px" } : {};
  // Sticky Header End


  // On click Add Class Start
  const [opensidebar, setOpenidebar] = useState(true);
  const openSidebar = () => {    
    setOpenidebar(!opensidebar);
    document.body.classList.add("full-screen");
  };
  // On click Add Class End

  const [logoutBoxVisible, setLogoutBoxVisible] = useState(false);
  const handleLogoutClick = () => {
    setLogoutBoxVisible(!logoutBoxVisible);
  };

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <>
      <div
        className={`header flex pl-[62px] pr-[68px] py-[26px]  items-center bg-[#131517] border-b-[#454545] border-b border-solid transition-[top] duration-[0.4s] ease-[ease-out] sticky z-[2] visible right-0 top-0 ${scrolltopdata}`}
        style={headerStyle}
      >
        <div className='toggle block md:hidden' onClick={openSidebar}>
            <span className='icon one'></span>
            <span className='icon two'></span>
          </div>

        <div className="ml-auto">
          <ul className="flex items-center">
            <li className="message relative">
              <img src={Message} alt="Message" />
              <span className="dots absolute h-1 w-1 bg-[#fff] rounded-full"></span>
            </li>
            <li className="mx-[32px]">
              <Link className="nav-link" to="/notification">
                <img src={NotificationIcon} alt="Notification" />
              </Link>
            </li>
            <li className="user flex relative cursor-pointer" onClick={handleLogoutClick}>
              <span className="h-12 w-12 rounded-full inline-block bg-color"></span>
              <span className="logoutBox bg-[#282A2C] rounded-[13px] text-[#fff] font-bold absolute w-[160px] right-[0px] text-left px-5 py-4 top-[60px] flex after:h-5 after:w-5 after:absolute after:top-[-7px] after:rotate-45 after:right-[18px] after:bg-[#282A2C]" style={{ display: logoutBoxVisible ? 'flex' : 'none' }} onClick={logoutHandler}>
                <span className="mr-[6px] mt-[3px]">
                  <LogoutIcon width="18" height="18" />
                </span>
                Sign Out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
