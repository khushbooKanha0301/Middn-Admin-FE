import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { useDispatch } from "react-redux";
import jwtAxios from "../../service/jwtAxios";
import Pagination from "../Pagination";
import { hideAddress } from "../../utils";
import moment from "moment";

function ReportUserList() {
  let PageSize = 5;
  const [users, setUsers] = useState(null);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [searchTrnx, setSearchTrnx] = useState(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getReportUsers = async () => {
    if (currentPage) {
      await jwtAxios
        .get(
          `/users/reportUserList?query=${
            searchTrnx ? searchTrnx : null
          }&page=${currentPage}&pageSize=${PageSize}`
        )
        .then((res) => {
          setUsers(res.data?.users);
          setTotalUsersCount(res.data?.totalUsersCount);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isComponentMounted) {
      const delayApiCall = setTimeout(() => {
        setDebouncedSearchValue(searchTrnx);
      }, 1000);

      return () => clearTimeout(delayApiCall);
    }
  }, [searchTrnx]);

  useEffect(() => {
    if (isComponentMounted) {
      setCurrentPage(1);
      getReportUsers();
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    getReportUsers();
    setIsComponentMounted(true);
  }, [currentPage]);

  useEffect(() => {
    getReportUsers();
  }, [currentPage]);

  return (
    <>
      <div className="mainUserList kycList">
        <h1 className="maintitle">Report Users</h1>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="tabsrow flex flex-wrap justify-between mb-[15px] gap-3">
              <SearchBar
                className="tabs-right"
                placeholder="Search by name"
                setSearchQuery={setSearchTrnx}
              />
            </div>
            <div className="kyc-common-table table-responsive">
              <div className="w-[900px] xl:w-full clsTable">
                <div className="flex-table-header">
                  <div className="transaction-user kycHead">User Report From</div>
                  <div className="transaction-user kycHead">User Report To</div>
                  <div className="transaction-user kycHead">Reported at</div>
                  <div className="transaction-user kycHead">Reason</div>             
                </div>
                 
                {users?.map((item, index) => (
                  <div className="flex-table-body tr" key={index}>
                    <div className="transaction-user tcol">
                      <p className="text-white mb-2">
                        {item?.fname_alias}  {item?.lname_alias}
                      </p>
                      <p className="kyc-para">
                        {hideAddress(item?.report_from_user_address, 5)}
                      </p>
                    </div>
                    <div className="transaction-user tcol">
                      <p className="text-white mb-2">
                      {item?.fname_to_alias}  {item?.lname_to_alias}
                      </p>
                      <p className="kyc-para">
                        {hideAddress(item?.report_to_user_address, 5)}
                      </p>
                    </div>
                    <div className="transaction-user tcol">
                       {item?.created_at} 
                    </div>
                    <div className="transaction-doctype  tcol">
                        <p className="text-white mb-2">
                            {item?.reason} 
                        </p>
                    </div>
                   
                  </div>
                ))}
                {totalUsersCount === 0 && loading === false && (
                  <div className="flex-table-body no-records justify-content-between">
                    <div className="no-records-text">
                      <div className="no-record-label">No Records</div>
                      <p>You haven't made any Report users records</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalUsersCount}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default ReportUserList;
