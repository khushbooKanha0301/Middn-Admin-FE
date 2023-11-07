import React, { useState } from "react";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import Desktop from "../../assets/images/Desktop.svg";
import { Link } from "react-router-dom";

function ManageEscrow() {
  const [searchTrnx, setSearchTrnx] = useState(null);
  let itemsPerPage = 8;
  const tablehead = [
    "Escrow Number",
    "Buyer",
    "Seller",
    "Amount",
    "Charge",
    "Charge Payer",
    "Status",
    "Action",
  ];

  const tablebody = [
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn succeed">50%-50%</button>,
      Status: <button className="table-btn ActiveUser userbtn">Accepted</button>,
      Action: Desktop,
    },
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$ 10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn seller">Seller</button>,
      Status: <button className="table-btn NotAccepted notbtn">Not Accepted</button>,
      Action: Desktop,
    },
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$ 10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn buyer">Buyer</button>,
      Status: <button className="table-btn cancelled cancelledbtn">Cancelled</button>,
      Action: Desktop,
    },
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$ 10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn buyer">Buyer</button>,
      Status: <button className="table-btn Disputed disputedbtn">Disputed</button>,
      Action: Desktop,
    },
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$ 10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn seller">Seller</button>,
      Status: <button className="table-btn Completed completedbtn">Completed</button>,
      Action: Desktop,
    },
    {
      EscrowNumber: "TNX1002",
      Buyer: "Abdul Qadeer",
      Seller: "Abdul Qadeer",
      Amount: "$ 10,000",
      Charge: "$100.00",
      ChargePayer:<button className="table-btn seller">Seller</button>,
      Status: <button className="table-btn NotAccepted notbtn">Not Accepted</button>,
      Action: Desktop,
    },
  ];
  
  // Filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");  
  const [currentPage, setCurrentPage] = useState(1);
  const filteredTableBody = tablebody.filter((item) => {
    if (selectedStatusFilter === "All") {
      return true;
    } else {
      return item.Status.props.className.includes(selectedStatusFilter.toLowerCase());
    }
  });
  let dataCount = filteredTableBody.length;

  return (
    <div className="mainUserList ManageEscrow">
      <h1 className="maintitle">Manage Escrow</h1>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="tabsrow flex flex-wrap justify-between mb-[15px] gap-3">
            <ul
              className="nav flex mb-0 list-none flex-wrap gap-2"
              role="tablist"
            >
              <li>
                <Link className={selectedStatusFilter === "All" ? "active" : ""} onClick={() => setSelectedStatusFilter("All")}>All</Link>
              </li>
              <li>
                <Link className={selectedStatusFilter === "userbtn" ? "active" : ""} onClick={() => setSelectedStatusFilter("userbtn")}>Accepted</Link>
              </li>
              <li>
                <Link className={selectedStatusFilter === "notbtn" ? "active" : ""} onClick={() => setSelectedStatusFilter("notbtn")}>Not Accepted</Link>
              </li>
              <li>
                <Link className={selectedStatusFilter === "completedbtn" ? "active" : ""} onClick={() => setSelectedStatusFilter("completedbtn")}>Completed</Link>
              </li>
              <li>              
                <Link className={selectedStatusFilter === "disputedbtn" ? "active" : ""} onClick={() => setSelectedStatusFilter("disputedbtn")}>Disputed <span className="number">50+</span></Link>
              </li>
              <li>              
                <Link className={selectedStatusFilter === "cancelledbtn" ? "active" : ""} onClick={() => setSelectedStatusFilter("cancelledbtn")}>Canceled</Link>
              </li>
            </ul>
            <SearchBar
              placeholder="Search by name"
              setSearchQuery={setSearchTrnx}
            />
          </div>

          <div className="common-table overflow-x-auto">
            <table className="w-[950px] xl:w-full">
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
                {filteredTableBody.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td>{item.EscrowNumber}</td>
                      <td>{item.Buyer}</td>
                      <td>{item.Seller}</td>
                      <td>{item.Amount}</td>
                      <td>{item.Charge}</td>
                      <td>{item.ChargePayer}</td>
                      <td>{item.Status}</td>
                      <td>
                        <Link className="action" to="/manageescrowdetails">
                          <img src={item.Action} alt="" /> Detail
                        </Link>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalCount={dataCount}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageEscrow;
