import React, { useState } from "react";
import SearchBar from "../SearchBar";
import TransactionLogsTable from "./TransactionLogsTable";

function TransactionLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="userTransaction">
        <h1 className="maintitle">Transaction Logs</h1>
        <div className="flex flex-wrap gap-[11px] justify-between mb-[15px]">
          
        <SearchBar placeholder="Transaction ID" setSearchQuery={setSearchQuery} />

          <div className="flex flex-wrap gap-[11px] items-start">
            <div className="custom-select common-box">
              <select>
                <option value="Type">Type</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="custom-select common-box">
              <select name="" id="">
                <option value="Type">Remark</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="common-box flex flex-wrap items-center">
              <span className="icon w-6 h-6 bg-[#C4C4C4] inline-block rounded-full mr-[5px]"></span>
              Date
            </div>
            <div className="common-box text-center filter">Filter</div>
          </div>
        </div>
        <TransactionLogsTable searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default TransactionLogs;
