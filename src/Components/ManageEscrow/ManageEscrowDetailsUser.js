import React from "react";
import dot from "../../assets/images/dots.svg";
import { Link } from "react-router-dom";

function ManageEscrowDetailsUser(props) {
  const ListHead = ["Date", "Amount", "Status"];
  const buyerDetails = [
    {
      date: "2023-03-22",
      amount: "$100.00",
      status: <span className="table-btn succeed"> Funded </span>
    },
    {
        date: "2023-03-22",
        amount: "$100.00",
        status: <span className="table-btn Unfunded"> Unfunded </span>
      },    
  ];

  return (
    <div className="contact w-full lg:w-[35.4%]">
      <div className="card bg-[#18191D] rounded-[32px] px-4 xl:px-8 py-[35px] lg:min-h-[588px] flex flex-col justify-between">
        <div className="top">
          <h3 className="text-white text-lg font-medium leading-6 mb-[38px]">
              Escrow Milestone
          </h3>
          <div className="overflow-x-auto listtable">
              <div className="list xl:w-full lg:w-[280px]">
                  <div className="ListHead flex flex-wrap mb-[47px]">
                  {ListHead.map((item,i) => (
                      <h4 key={i} className="text-white text-[13px] font-medium leading-[18px]">
                      {item}
                      </h4>
                  ))}
                  </div>
                  {buyerDetails.map((row, i) => (
                  <div
                      key={i}
                      className="flex flex-wrap items-center buyerDetailsRow mb-12"
                  >
                      <span className="text-white text-xs font-medium leading-[18px]">
                      {row.date}
                      </span>
                      <span className="text-white text-xs font-medium leading-[18px]">
                      {row.amount}
                      </span>
                      
                      {row.status}
                      
                  </div>
                  ))}
              </div>
          </div>
        </div>

        <button className="GradiantBtn inline-block mt-1 w-full" onClick={props.backToDetail}>                        
          Back to detail
        </button>
      </div>
    </div>
  );
}

export default ManageEscrowDetailsUser;
