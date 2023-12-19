import React, { useState } from "react";
import Check from "../../assets/images/Check.svg";
import Transh from "../../assets/images/Trash.svg";
import Dots from "../../assets/images/dots.svg";
import Pagination from "../Pagination";

// import Pagination from "../../Components/Pagination"

function Notification() {  
  const NotoficationData = [
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
    {
      title: "New member registered",
      hours: "9 hours ago",
    },
  ];


  // Pagination Start
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedItems = NotoficationData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelected(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(NotoficationData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelected(currentPage + 1);
    }
  };
  
  // Pagination End

  return (
    <>
      <div className="notification-top flex flex-wrap gap-3 items-center justify-between mb-[38px]">
        <h1 className="text-[18px] text-white">Notification</h1>
        <ul className="flex gap-3">
          <li>
            <img src={Check} alt="" />
          </li>
          <li>
            <img src={Transh} alt="" />
          </li>
          <li>
            <img src={Dots} alt="" />
          </li>
        </ul>
      </div>
      <div className="NotoficationCard mb-[71px]">
        {displayedItems.map((data, index) => (
          <div className="common-card mb-2.5 rounded-3xl" key={index}>
            <h3 className="text-white text-base font-bold leading-5 mb-[7px]">
              {data.title}
            </h3>
            <p className="text-[rgba(255,255,255,0.5)] text-[13px] font-bold leading-5">
              {data.hours}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={NotoficationData.length}
        pageSize={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  );
}

export default Notification;
