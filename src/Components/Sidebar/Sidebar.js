import React, { useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import house from "../../assets/images/house.svg";
import GitDiff from "../../assets/images/GitDiff.svg";
import Activity from "../../assets/images/Activity.svg";
import Question from "../../assets/images/Question.svg";
import Coins from "../../assets/images/Coins.svg";

function Sidebar(props) {
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const [isToggled, setIsToggled] = useState(false);

  const ToggleBtn = () => {
    setIsToggled(!isToggled);
    document.body.classList.toggle("full-screen");
  };
  // Toggle End

  // On click Remove Class Start
  const [closesidebar, setClosesidebar] = useState(true);
  const closeSidebar = () => {
    setClosesidebar(!closesidebar);
    document.body.classList.remove("full-screen");
  };
  let SidebarMenu = [];
  // On click Remove Class End
  if (props.roleId === 1) {
    SidebarMenu = [
      {
        icon: house,
        title: "Dashboard",
        link: "/",
        activeRoutes: ["notification"],
      },
      {
        icon: GitDiff,
        title: "User List",
        link: "/userlist",
        activeRoutes: [
          "userdetails",
          "userdeposithistory",
          "transactionlogs",
          "userloginhistory",
        ],
      },
      {
        icon: Activity,
        title: "Manage Escrow",
        link: "/manageescrow",
        activeRoutes: ["manageescrowdetails", "manageescrowdetailsUser"],
      },
      {
        icon: Coins,
        title: "Deposit",
        link: "/deposit",
        activeRoutes: [],
      },
      {
        icon: Question,
        title: "Withdraw",
        link: "/withdraw",
        activeRoutes: [],
      },
    ];
  } else {
     SidebarMenu = [
      {
        icon: house,
        title: "Dashboard",
        link: "/",
        activeRoutes: ["notification"],
      },
      {
        icon: GitDiff,
        title: "User List",
        link: "/userlist",
        activeRoutes: [
          "userdetails",
          "userdeposithistory",
          "transactionlogs",
          "userloginhistory",
        ],
      },
      {
        icon: Activity,
        title: "Manage Escrow",
        link: "/manageescrow",
        activeRoutes: ["manageescrowdetails", "manageescrowdetailsUser"],
      },
    ];
  }
  
  return (
    <div className="mainSidebar bg-[#131517] border-r-[#454545] border-r border-solid">
      <div className="top-sidebar flex justify-between">
        <Link className="nav-link" to="/">
          <span className="icon">
            <img src={logo} alt="" />
          </span>
        </Link>
        <div className="toggle hidden md:block" onClick={ToggleBtn}>
          <span className="icon one"></span>
          <span className="icon two"></span>
        </div>
        <div className={`toggle block md:hidden`} onClick={closeSidebar}>
          <span className="icon one"></span>
          <span className="icon two"></span>
        </div>
      </div>
      <div className="mt-[-5px]">
        <span className="text-[12px] text-[#808191] mb-[16px] inline-block iconApp">
          Ico App
        </span>
        <ul className="menu">
          {SidebarMenu.map((menuItem, index) => (
            <li key={index}>
              <NavLink
                className={
                  menuItem.activeRoutes.includes(routeName)
                    ? "active nav-link"
                    : "nav-link"
                }
                to={menuItem.link}
              >
                <span className="icon">
                  <img src={menuItem.icon} alt="" />
                </span>
                {menuItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
