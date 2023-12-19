import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import close from "../../assets/images/close.svg"

function DepositHistoryModal({ open, handleOpen, item }) {
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
      ans: "1USD = 1.00 GHC",
    },
    {
      title: "Payable",
      ans: "102.00 USD",
    },
  ];
  let itemClass = "table-btn initiated";
  if(item?.status == "Initiated")
  {
    itemClass = "table-btn initiated";
  }else if (item?.status == "Succeed"){
    itemClass = "table-btn succeed";
  }else if(item?.status == "Rejected"){
    itemClass = "table-btn Unfunded";
  }
  return (
    <>
       <Dialog
        open={open}
        handler={handleOpen}
        className="bg-[#1E1F24] rounded-[24px] px-6 sm:px-8 py-[38px] max-w-[522px] relative DepositDetailsPopup"
      >
        <DialogHeader className="items-start flex flex-wrap justify-between mb-6 p-0 pr-9 gap-3">
          <h3 className="text-white pt-2">
            Deposit via Mobile Money
          </h3>
          <span className={itemClass}>
            {item?.status}
          </span>
        </DialogHeader>
        <DialogBody divider className="border-none p-0">
          <h3 className="text-white text-[13px] font-medium leading-6">
            Abdul Qadeer Requested 100.00 USD
          </h3>
          <h4 className="text-[rgba(255,255,255,0.48)] text-[13px] font-medium leading-6 mb-4">
            2023-01-14 10:05 PM
          </h4>
          <div className="pt-[23px] pb-2 px-[18px] border rounded-[13px] border-solid border-[#4B4B4B]">
            {DepositDetails.map((row, i) => (
              <div key={i} className="flex flex-wrap justify-between mb-[15px]">
                <h4 className="text-white text-sm font-normal leading-[normal] tracking-[-0.07px] pr-3 w-[100%] sm:w-[50%]">
                  {row.title}
                </h4>
                <p className="text-white text-sm font-normal leading-[normal] tracking-[-0.07px] w-[100%] sm:w-[50%]">
                  {row.ans}
                </p>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="absolute top-[48px] right-8 p-0">
        <Button
          variant="text"
          onClick={handleOpen}   
          className="p-0"       
        >
          <img src = {close} alt="img" /> 
        </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DepositHistoryModal;
