import React from "react";
import { Link } from "react-router-dom";
import Desktop from "../../assets/images/Desktop.svg";

function DashboardTable() {
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

  const data = [
    {
      escrowNumber: "TNX1002",
      buyer: "Abdul Qadeer",
      seller: "Abdul Qadeer",
      amount: "$ 10,000",
      charge: "$100.00",
      chargePayer: (
        <button className="table-btn succeed">
          50%-50%
        </button>
      ),
      status: (
        <button className="table-btn accepted">
          Accepted
        </button>
      ),
      Action: Desktop,
    },
    {
      escrowNumber: "TNX1002",
      buyer: "Abdul Qadeer",
      seller: "Abdul Qadeer",
      amount: "$ 10,000",
      charge: "$100.00",
      chargePayer: (
        <button className="table-btn seller">
          Seller
        </button>
      ),
      status: (
        <button className="table-btn initiated">
          Not Accepted
        </button>
      ),
      Action: Desktop,
    },
    {
      escrowNumber: "TNX1002",
      buyer: "Abdul Qadeer",
      seller: "Abdul Qadeer",
      amount: "$ 10,000",
      charge: "$100.00",
      chargePayer: (
        <button className="table-btn buyer">
          Buyer
        </button>
      ),
      status: (
        <button className="table-btn cancelled">
          Cancelled
        </button>
      ),
      Action: Desktop,
    },
  ];

  return (
    <>
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
            {data.map((item, index) => (
              <tr key={index}>
                <>
                  <td>{item.escrowNumber}</td>
                  <td>{item.buyer}</td>
                  <td>{item.seller}</td>
                  <td>{item.amount}</td>
                  <td>{item.charge}</td>
                  <td>{item.chargePayer}</td>
                  <td>{item.status}</td>
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
    </>
  );
}

export default DashboardTable;
