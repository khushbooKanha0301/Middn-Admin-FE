import React, { useState } from "react";
import Desktop from "../../assets/images/Desktop.svg";
import { Link } from "react-router-dom";
import UserDepositHistoryModal from "./UserDepositHistoryModal";

function UserDepositHistoryTable({ searchQuery }) {
  const tablehead = [
    "Transaction ID",
    "Initiated",
    "Initiated",
    "Conversion",
    "Conversion",
    "Status",
    "Action",
  ];

  const tablebody = [
    {
      TransactionID: "MDDN2101238",
      Initiated1: "2023-01-04 11: AM",
      Initiated2: "2023-01-04 11: AM",
      Conversion1: (
        <span>
          $ 100.00 + <span className="text-[#D35D5D]">2.00</span> <br />
          <span className="block mt-[8px]">2000.00 USD</span>
        </span>
      ),
      Conversion2: (
        <span>
          1 USD = 1.00 USD <br />
          <span className="block mt-[8px]">102.00 USD</span>
        </span>
      ),
      status: 'Initiated',
      Action: Desktop,
    },
    {
      TransactionID: "MDDN2101238",
      Initiated1: "2023-01-04 11: AM",
      Initiated2: "2023-01-04 11: AM",
      Conversion1: (
        <span>
          $ 100.00 + <span className="text-[#D35D5D]">2.00</span> <br />
          <span className="block mt-[8px]">2000.00 USD</span>
        </span>
      ),
      Conversion2: (
        <span>
          1 USD = 1.00 USD <br />
          <span className="block mt-[8px]">102.00 USD</span>
        </span>
      ),
      status: 'Succeed',
      Action: Desktop,
    },
    {
      TransactionID: "MDDN2101238",
      Initiated1: "2023-01-04 11: AM",
      Initiated2: "2023-01-04 11: AM",
      Conversion1: (
        <span>
          $ 100.00 + <span className="text-[#D35D5D]">2.00</span> <br />
          <span className="block mt-[8px]">2000.00 USD</span>
        </span>
      ),
      Conversion2: (
        <span>
          1 USD = 1.00 USD <br />
          <span className="block mt-[8px]">102.00 USD</span>
        </span>
      ),
      status: 'Initiated',
      Action: Desktop,
    },
  ];

  const filteredTableBody = tablebody.filter((ii) =>
    ii.TransactionID.includes(searchQuery)
  );

  //  Model
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const handleOpen = (item) => {
    if(item.TransactionID) {
      setItem(item);
    }
    setOpen(!open);
  }

  return (
    <>
      <div className="common-table overflow-x-auto">
        <table className="w-[920px] xl:w-full">
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
                  <td>{item.Initiated1}</td>
                  <td>{item.Initiated2}</td>
                  <td>{item.Conversion1}</td>
                  <td>{item.Conversion2}</td>
                  <td><button className={item.status == "Initiated" ? "table-btn initiated" : "table-btn succeed"}>{item.status}</button></td>
                  <td>
                    <Link
                      className="action"
                      onClick={() => handleOpen(item)} variant="gradient"
                    >
                      <img src={item.Action} alt="" /> Detail
                    </Link>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDepositHistoryModal open={open} item={item} handleOpen={handleOpen} />    
    </>
  );
}

export default UserDepositHistoryTable;
