import React, { useState } from "react";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import UserListTable from "./UserListTable";
import jwtAxios from '../../service/jwtAxios';
import { useEffect } from "react";

function UserList() {
  const PageSize = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState(false);
 console.log("statusFilter ", statusFilter);
  const [searchTrnx, setSearchTrnx] = useState(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const getusers = async () => {
    if (currentPage) {
      await jwtAxios
        .get(`/users/userList?query=${
          searchTrnx ? searchTrnx : null
        }&statusFilter=${
          statusFilter ? statusFilter : false
        }&page=${currentPage}&pageSize=${PageSize}`)
        .then((res) => {
          console.log(res.data?.users)
          setUsers(res.data?.users);
          setTotalUsersCount(res.data?.totalUsersCount);
          setUserLoading(false);
        })
        .catch((err) => {
          setUserLoading(false);
        });
    }
  };
  useEffect(() => {
    if(isComponentMounted)
    {
      
      const delayApiCall = setTimeout(() => {
        setDebouncedSearchValue(searchTrnx);
      }, 1000);
      
      return () => clearTimeout(delayApiCall);
    }
  }, [searchTrnx]);

  useEffect(() => {
    if(isComponentMounted)
    {
      setCurrentPage(1);
      getusers();
    }
  },[debouncedSearchValue,statusFilter])

  useEffect(() => {
    getusers();
    setIsComponentMounted(true);
  }, [currentPage]);

  const changeStatus = (status) => {
 console.log("status ", status);
    setStatusFilter(status);
  };
  
  return (
    <div className="mainUserList">
      <h1 className="maintitle">Manage User</h1>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="tabsrow flex flex-wrap justify-between mb-[15px] gap-3">
            <ul
              className="nav flex mb-0 list-none flex-wrap gap-2"
              role="tablist"
            >
              <li>
                <Link className={statusFilter === "All" ? "active" : ""} onClick={() => changeStatus(false)}>Active Users
                 <span className="number">{totalUsersCount}</span>
                </Link>
              </li>
              <li>
                <Link className={statusFilter === "banneduser" ? "active" : ""} onClick={() => changeStatus(true)}>
                  Banned Users
                  <span className="number">{totalUsersCount}</span>
                </Link>
              </li>


              <li>
                <Link className={statusFilter === "emailunverified" ? "active" : ""} onClick={() => setStatusFilter("emailunverified")}>Email Unverified  <span className="number">50 +</span> </Link>
              </li>
              <li>
                <Link className={statusFilter === "mobileunverified" ? "active" : ""} onClick={() => setStatusFilter("mobileunverified")}>Mobile Unverified <span className="number">50 +</span></Link>
              </li>
              
            </ul>
            <SearchBar placeholder="Search by name" setSearchQuery={setSearchTrnx}/>
          </div>

          <UserListTable filteredTableBody={users}/>

          <Pagination
            currentPage={currentPage}
            totalCount={totalUsersCount}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
           />
        </div>
      </div>
    </div>
  );
}

export default UserList;
