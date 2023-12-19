import React, { useState } from "react";
import SearchBar from "../SearchBar";
import UserDepositHistoryTable from "./UserDepositHistoryTable";



function UserDepositHistory() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="userdeposithistory">
        <h1 className="maintitle">Deposit History</h1>
        <div className="flex flex-wrap gap-2 justify-between mb-[15px]">
          <SearchBar
            placeholder="Transaction ID"
            setSearchQuery={setSearchQuery}
          />
        </div>
        <UserDepositHistoryTable searchQuery={searchQuery} />
      </div>
      
    </>
  );
}

export default UserDepositHistory;
