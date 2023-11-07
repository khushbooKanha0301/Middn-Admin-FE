import React, { useState } from "react";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import Desktop from "../../assets/images/Desktop.svg";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import close from "../../assets/images/close.svg";
import File from "../../assets/images/File.svg";

function Withdraw() {
  let PageSize = 8;
  const tablehead = [
    "Gateway",
    "Initiated",
    "User",
    "Amount",
    "Conversion",
    "Status",
    "Action",
  ];
  const [searchTrnx, setSearchTrnx] = useState(null);

  const tablebody = [
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: <button className="table-btn cancelled pending">Pending</button>,
      Action: Desktop,
    }, 
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: <button className="table-btn Unfunded rejected">Rejected</button>,
      Action: Desktop,
    },  
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: (
        <button className="table-btn Completed approved">Approved</button>
      ),
      Action: Desktop,
    },
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: <button className="table-btn cancelled pending">Pending</button>,
      Action: Desktop,
    },
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: <button className="table-btn cancelled pending">Pending</button>,
      Action: Desktop,
    },
    {
      Gateway: (
        <p>
          Blockchain{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
            JKX123123OPJ
          </span>
        </p>
      ),
      Initiated: (
        <p>
          2023-05-12 12:52 PM{" "}
          <span className="text-[#505050] text-[10px] font-bold leading-5 mt-[8px] uppercase block">
          2 DAYS AGO
          </span>
        </p>
      ),
      User: "Abdul Qadeer",
      Amount: (
        <p>
          $ 100.00 + <span className="text-[#D35D5D]">+11.00</span>
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Conversion: (
        <p>
          1 USD = 10.00 USD
          <span className="block mt-[8px]">111.00 USD</span>
        </p>
      ),
      Status: <button className="table-btn cancelled pending">Pending</button>,
      Action: Desktop,
    },
  ];

  // Filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const filteredTableBody = tablebody.filter((item) => {
    if (selectedStatusFilter === "All") {
      return true;
    } else {
      return item.Status.props.className.includes(
        selectedStatusFilter.toLowerCase()
      );
    }
  });

  let dataCount = filteredTableBody.length;


  // Modal
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleOpen = () => setOpen(!open);  

  const DepositDetails = [
    {
      title: "Transaction Number",
      ans: "MDDN2101238",
    },
    {
      title: "Name",
      ans: <span className="font-bold textGradiant">Abdul Qadeer</span>,
    },
    {
      title: "Method",
      ans: "Mobile Money",
    },
    {
      title: "Amount",
      ans: "100.00 USD",
    },
    {
      title: "Charge",
      ans: "2.00 USD",
    },
    {
      title: "After Charge",
      ans: "102.00 USD",
    },
    {
      title: "Rate",
      ans: "1 USD = 1.00 GHC",
    },
    {
      title: "Payable",
      ans: "102.00 USD",
    },
  ];

  const DepositInformation = [
    {
      title: "Send From Number",
      ans: "0000000000",
    },
    {
      title: "Transaction Number",
      ans: "002",
    },
    {
      title: " Screenshot",
      ans: (
        <div className="flex flex-wrap">
          <img src={File} alt="Attachment" className="mr-1" />
          <span className="font-bold textGradiant">Attachment</span>
        </div>
      ),
    },
  ];  


  return (
    <>
      <div className="mainUserList withdrow">
        <h1 className="maintitle">Withdrawals Log</h1>

        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="tabsrow flex flex-wrap justify-between mb-[15px] gap-3">
              <ul
                className="nav flex mb-0 list-none flex-wrap gap-2"
                role="tablist"
              >
                <li>
                  <Link
                    className={selectedStatusFilter === "All" ? "active" : ""}
                    onClick={() => setSelectedStatusFilter("All")}
                  >
                    All
                  </Link>
                </li>
               
                <li>
                  <Link
                    className={
                      selectedStatusFilter === "approved" ? "active" : ""
                    }
                    onClick={() => setSelectedStatusFilter("approved")}
                  >
                    Approved
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      selectedStatusFilter === "pending" ? "active" : ""
                    }
                    onClick={() => setSelectedStatusFilter("pending")}
                  >
                    Pending<span className="number">50+</span>
                  </Link>
                </li>              
                <li>
                  <Link
                    className={
                      selectedStatusFilter === "rejected" ? "active" : ""
                    }
                    onClick={() => setSelectedStatusFilter("rejected")}
                  >
                    Rejected
                  </Link>
                </li>               
              </ul>
              <SearchBar placeholder="Search by name" setSearchQuery={setSearchTrnx} />
            </div>

            <div className="common-table overflow-x-auto">
              <table className="w-[1045px] xl:w-full">
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
                        <td>{item.Gateway}</td>
                        <td>{item.Initiated}</td>
                        <td>{item.User}</td>
                        <td>{item.Amount}</td>
                        <td>{item.Conversion}</td>
                        <td>{item.Status}</td>
                        <td>
                          <Link className="action" onClick={handleOpen} variant="gradient">
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
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        className="DepositMobileMoney rounded-3xl bg-[#1E1F24] p-8 max-w-[1132px]"
      >
        <DialogHeader className="items-start flex flex-wrap justify-between mb-6 p-0 pr-9 gap-3">
          <h3 className="text-white pt-2">Widraw Detail</h3>
          <span className="table-btn cancelled">Pending</span>
        </DialogHeader>
        <DialogBody divider className="border-none p-0">
          <h3 className="text-white text-[13px] font-medium leading-6">
            Abdul Qadeer Requested 100.00 USD
          </h3>
          <h4 className="text-[rgba(255,255,255,0.48)] text-[13px] font-medium leading-6 mb-4">
            2023-01-14 10:05 PM
          </h4>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="sm:h-full pt-[23px] pb-2 px-[18px] border rounded-[13px] border-solid border-[#4B4B4B]">
                {DepositDetails.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap justify-between mb-[15px] gap-1 sm:gap-0"
                  >
                    <h4 className="text-white font-normal text-sm leading-[normal] tracking-[-0.07px] pr-3 w-[100%] sm:w-[50%]">
                      {row.title}
                    </h4>
                    <p className="text-white font-normal text-sm leading-[normal] tracking-[-0.07px] pr-3 w-[100%] sm:w-[50%]">
                      {row.ans}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:-translate-y-12">
              <h3 className="text-white mb-6">Widraw Information</h3>
              <div className="sm:h-full py-[23px] px-[18px] border rounded-[13px] border-solid border-[#4B4B4B] flex flex-col justify-between">
                <div className="DepositInformationList">
                  {DepositInformation.map((info, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap justify-between mb-[15px] gap-1 sm:gap-0"
                    >
                      <h4 className="text-white font-normal text-sm leading-[normal] tracking-[-0.07px] pr-3 w-[100%] sm:w-[50%]">
                        {info.title}
                      </h4>
                      <div className="text-white font-normal text-sm leading-[normal] tracking-[-0.07px] pr-3 w-[100%] sm:w-[50%]">
                        {info.ans}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-[10px]">
                  <button
                    className="GradiantBtn"
                  >
                    Approved
                  </button>
                  <button className="PinkBtn">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="absolute top-[42px] right-8 p-0">
          <Button variant="text" onClick={handleOpen} className="p-0">
            <img src={close} alt="img" />
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
}

export default Withdraw;
