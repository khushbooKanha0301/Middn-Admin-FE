import React, { useState } from "react";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import UserListTable from "./UserListTable";
import jwtAxios from "../../service/jwtAxios";
import { useEffect } from "react";

function UserList() {
  const PageSize = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTrnx, setSearchTrnx] = useState(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const [totalActiveCount, setTotalActiveCount] = useState(0);
  const [AllUserCount, setAllUserCount] = useState(0);
  const [totalBanCount, setTotalBanCount] = useState(0);
  const [totalEmailCount, setTotalEmailCount] = useState(0);
  const [totalPhoneCount, setTotalPhoneCount] = useState(0);

  const getusers = async () => {
    if (currentPage) {
      await jwtAxios
        .get(
          `/users/userList?query=${
            searchTrnx ? searchTrnx : null
          }&statusFilter=${
            statusFilter ? statusFilter : 'All'
          }&page=${currentPage}&pageSize=${PageSize}`
        )
        .then((res) => {
          setUsers(res.data?.users);
          setTotalUsersCount(res.data?.totalUsersCount);
          setAllUserCount(res.data?.allUserCount)
          setTotalActiveCount(res.data?.activeCount);
          setTotalBanCount(res.data?.banCount);
          setTotalEmailCount(res.data?.emailCount);
          setTotalPhoneCount(res.data?.phoneCount);
          setUserLoading(false);
        })
        .catch((err) => {
          setUserLoading(false);
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
      getusers();
    }
  }, [debouncedSearchValue, statusFilter]);

  useEffect(() => {
    getusers();
    setIsComponentMounted(true);
  }, [currentPage]);

  const changeStatus = (status) => {
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
                <Link
                  className={statusFilter === 'All' ? "active" : ""}
                  onClick={() => changeStatus('All')}
                >
                  All
                  <span className="number">{AllUserCount > 50 ? '50+' : AllUserCount}</span>
                </Link>
              </li>

              <li>
                <Link
                  className={statusFilter === 'Active' ? "active" : ""}
                  onClick={() => changeStatus('Active')}
                >
                  Active Users
                  <span className="number">{totalActiveCount > 50 ? '50+' : totalActiveCount}</span>
                </Link>
              </li>
              <li>
                <Link
                  className={statusFilter === 'Ban' ? "active" : ""}
                  onClick={() => changeStatus('Ban')}
                >
                  Banned Users
                  <span className="number">{totalBanCount}</span>
                </Link>
              </li>
              <li>
                <Link
                  className={statusFilter === 'Email' ? "active" : ""}
                  onClick={() => changeStatus('Email')}
                >
                  Email Unverified
                  <span className="number">{totalEmailCount > 50 ? '50+': totalEmailCount}</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  className={statusFilter === 'Mobile' ? "active" : ""}
                  onClick={() => changeStatus('Mobile')}
                >
                  Mobile Unverified
                  <span className="number">{totalPhoneCount > 50 ? '50+': totalPhoneCount}</span>
                </Link>
              </li>
            </ul>
            <SearchBar
              placeholder="Search by name"
              setSearchQuery={setSearchTrnx}
            />
          </div>
          <UserListTable filteredTableBody={users} statusFilter={statusFilter}/>
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
