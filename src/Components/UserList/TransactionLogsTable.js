import React from "react";
import { Link } from "react-router-dom";

function TransactionLogsTable({ searchQuery }) {   
      
  const tablehead = [
    "Transaction ID",
    "Amount",
    "Transacted",
    "Post Balance",
  ];

  const tablebody = [
    {
        TransactionID: "MDDN2101238",   
        Amount:<span className="text-[#7FFC8D]"> + 2000.00 USD </span> ,
        Transacted:"2023-01-04 11: AM",
        PostBalance: "2000.00 USD",
        link:"/"
    },
    {
        TransactionID: "MDDN2101238",   
        Amount:<span className="text-[#7FFC8D]"> + 2000.00 USD </span> ,
        Transacted:"2023-01-04 11: AM",
        PostBalance: "2000.00 USD",
        link:"/" 
    },
    {
        TransactionID: "MDDN2101238",   
        Amount:<span className="text-[#D35D5D]"> + 2000.00 USD </span> ,
        Transacted:"2023-01-04 11: AM",
        PostBalance: "2000.00 USD",
        link:"/" 
    },
  ];

  const filteredTableBody = tablebody.filter((ii) =>
    ii.TransactionID.includes(searchQuery)
  );

  return (
    <>
      <div className="common-table overflow-x-auto">
      <table className="w-[700px] lg:w-full">
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
                  <td>{item.TransactionID}</td>
                  <td>{item.Amount}</td>
                  <td>{item.Transacted}</td>
                  <td>{item.PostBalance}</td>                  
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionLogsTable;
