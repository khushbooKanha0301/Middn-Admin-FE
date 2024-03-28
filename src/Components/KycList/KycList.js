import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2/src/sweetalert2.js";
import jwtAxios from "../../service/jwtAxios";
import { notificationFail } from "../../store/slices/notificationSlice";
import Pagination from "../Pagination";
import { hideAddress, getDateFormate } from "../../utils";
import listData from "../countryData";
import moment from "moment";
import close from "../../assets/images/close.svg";
import {
  EyeIcon,
  TrashIcon,
  SimpleDotedIcon,
  CheckBoxIcon,
  CancelIcon,
  DownloadIcon,
} from "../SVGIcon";
import {
  Dialog,
  DialogHeader
} from "@material-tailwind/react";

function Kyclist() {
  let foundCountry = null;
  let formattedDate = null;
  let PageSize = 5;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const [viewKYC, setViewKYC] = useState();
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTrnx, setSearchTrnx] = useState(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [kycLoading, setKycLoading] = useState(true);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedPendingItem, setSelectedPendingItem] = useState(null); 

  const countryDropdownRef = useRef(null);
  const optionsDropdownRef = useRef(null);

  const countryMap = listData.reduce((acc, item) => {
    acc[item.iso] = item.country;
    return acc;
  }, {});

  if (viewKYC?.user?.location) {
    foundCountry = countryMap[viewKYC?.user?.location];
  }
  
  if (viewKYC?.user?.dob) {
    formattedDate = moment(viewKYC?.user?.dob, "DD/MM/YYYY").format(
      "D MMMM, YYYY"
    );
  }

  const toggleDropdown = (event) => {
    if (
      countryDropdownRef.current &&
      !countryDropdownRef.current.contains(event.target) &&
      optionsDropdownRef.current &&
      !optionsDropdownRef.current.contains(event.target)
    ) {
      setIsDropdownVisible(false);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    // Add global click event listener
    document.addEventListener("click", toggleDropdown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", toggleDropdown);
    };
  }, []);

  const getKYC = async () => {
    if (currentPage) {
      await jwtAxios
        .get(
          `/users/kycUserList?query=${
            searchTrnx ? searchTrnx : null
          }&statusFilter=${
            statusFilter ? statusFilter : null
          }&page=${currentPage}&pageSize=${PageSize}`
        )
        .then((res) => {
          setIsDropdownVisible(false);
          setShowOptions(false);
          setUsers(res.data?.users);
          setTotalUsersCount(res.data?.totalUsersCount);
          setKycLoading(false);
        })
        .catch((err) => {
          setKycLoading(false);
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
      getKYC();
    }
  }, [debouncedSearchValue, statusFilter]);

  useEffect(() => {
    getKYC();
    setIsComponentMounted(true);
  }, [currentPage]);

  const acceptUserKyc = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this KYC application?",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#808080",
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          jwtAxios
            .get(`/users/acceptKyc/${id}`)
            .then((res) => {
              Swal.fire("Approved!", "KYC approved successfully...", "success");
              getKYC();
            })
            .catch((err) => {
              if (typeof err == "string") {
                dispatch(notificationFail(err));
              } else {
                dispatch(notificationFail(err?.response?.data?.message));
              }
            });
        }
      }
    });
  };

  const rejectUserKyc = (id) => {
    Swal.fire({
      title: "Do you want to reject this KYC application?",
      input: "textarea",
      inputLabel: "Rejection Reason sent to Mail",
      inputPlaceholder: "Type reason to reject kyc application...",
      inputAttributes: {
        "aria-label": "Type reason to reject kyc application...",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "red",
      customClass: {
        popup: "suspend",
      },
      // error: error ? error : null,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          jwtAxios
            .post(`/users/rejectKyc/${id}`, { message: result.value })
            .then((res) => {
              getKYC();
              Swal.fire("Rejected!", "KYC has been rejected...", "danger");
            })
            .catch((err) => {
              if (typeof err == "string") {
                dispatch(notificationFail(err));
              } else {
                dispatch(notificationFail(err?.response?.data?.message));
              }
            });
        }
      }
    });
  };
  const deleteUserKyc = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete this KYC application?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#808080",
      confirmButtonText: "Delete",
      customClass: {
        popup: "suspend",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          jwtAxios
            .get(`/users/deleteKyc/${id}`)
            .then((res) => {
              if (users.length === 1) {
                setCurrentPage(currentPage - 1);
              }
              getKYC();
              Swal.fire("Deleted!", "KYC has been deleted...", "danger");
            })
            .catch((err) => {
              if (typeof err == "string") {
                dispatch(notificationFail(err));
              } else {
                dispatch(notificationFail(err?.response?.data?.message));
              }
            });
        }
      }
    });
  };

  const handleUserImageDownload = async (id) => {
    let res = await jwtAxios.get(`/users/viewKyc/${id}`).then((res) => {
      return res.data;
    });

    const link = document.createElement("a");
    link.href = res?.user_photo_url;
    link.download = res?.user?.user_photo_url;
    link.click();
  };

  const handlePassportImageDownload = async (id) => {
    let res = await jwtAxios.get(`/users/viewKyc/${id}`).then((res) => {
      return res.data;
    });

    const link = document.createElement("a");
    link.href = res?.passport_url;
    link.download = res?.user?.passport_url;
    link.click();
  };

  const modalToggle = async (id) => {
    jwtAxios
      .get(`/users/viewKyc/${id}`)
      .then((res) => {
        setViewKYC(res?.data);
        setModalShow(!modalShow);
      })
      .catch((error) => {
        dispatch(notificationFail(error?.response?.data?.message));
      });
  };
  const changeStatus = (status) => {
    setStatusFilter(status);
  };

  const toggleOptions = (itemId) => {
    setShowOptions(!showOptions);
    setIsDropdownVisible(false);
    setSelectedPendingItem(itemId)
  };
  
  const toggleCountryOptions = (itemId) => {
    setIsDropdownVisible(!isDropdownVisible);
    setShowOptions(false); // Hide the options dropdown if it's visible
    setSelectedItem(itemId);
  };

  return (
    <>
      <div className="mainUserList kycList">
        <h1 className="maintitle">KYC List</h1>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="tabsrow flex flex-wrap justify-between mb-[15px] gap-3">
              <ul
                className="nav flex mb-0 list-none flex-wrap gap-2"
                role="tablist"
              >
                <li>
                  <Link
                    onClick={() => changeStatus("All")}
                    className={statusFilter == "All" ? "active" : ""}
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => changeStatus("Pending")}
                    className={statusFilter == "Pending" ? "active" : ""}
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => changeStatus("Approved")}
                    className={statusFilter == "Approved" ? "active" : ""}
                  >
                    Approved
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => changeStatus("Rejected")}
                    className={statusFilter == "Rejected" ? "active" : ""}
                  >
                    Rejected
                  </Link>
                </li>
              </ul>
              <SearchBar
                placeholder="Search by name"
                setSearchQuery={setSearchTrnx}
              />
            </div>
            <div className="kyc-common-table">
              <div className="w-[900px] xl:w-full clsTable">
                <div className="flex-table-header">
                  <div className="transaction-user kycHead">User</div>
                  <div className="transaction-doctype kycHead">Doc type</div>
                  <div className="transaction-documents kycHead">Documents</div>
                  <div className="transaction-doc-download kycHead"></div>
                  <div className="transaction-type kycHead">Type</div>
                </div>
                 
                {users?.map((item, index) => (
                  <div className="flex-table-body tr" key={index}>
                    <div className="transaction-user tcol">
                      <p className="text-white mb-2">
                        {item?.fname} {item?.lname}{" "}
                      </p>
                      <p className="kyc-para">
                        {hideAddress(item?.wallet_address, 5)}
                      </p>
                    </div>
                    <div className="transaction-doctype  tcol">
                      <p className="text-white">
                        {item?.verified_with === "government-passport"
                          ? "National Id Card"
                          : "Driving License"}
                      </p>
                    </div>
                    <div className="transaction-documents  tcol">
                      <p className="text-white mb-2">Document Image</p>
                        {item?.passport_url && item?.passport_url !== "" ? (
                          <>
                            <a
                              className="passport-image"
                              style={{ color: "gray", texdivecoration: "none" }}
                              onClick={() =>
                                handlePassportImageDownload(item?._id)
                              }
                              download
                            >
                              <DownloadIcon width="18" height="18" />
                              Download
                            </a>
                          </>
                        ) : (
                          <p>No Image</p>
                        )}
                    </div>
                    <div className="transaction-doc-download  tcol">
                      <p className="text-white mb-2">User Image</p>
                      {item?.user_photo_url && item?.user_photo_url !== "" ? (
                        <>
                          <a
                            className="passport-image"
                            style={{ color: "gray", texdivecoration: "none" }}
                            onClick={() => handleUserImageDownload(item?._id)}
                            download
                          >
                            <DownloadIcon width="18" height="18" />
                            Download
                          </a>
                        </>
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                    <div className="transaction-type  tcol">
                      <div className="flex items-center justify-between">
                        {item?.is_verified === 2 && (
                          <button type="button" className="table-btn danger">
                            Rejected
                          </button>
                        )}
                         {item?.is_verified === 1 && (
                          <button type="button" className="table-btn succeed">
                            Approved
                          </button>
                        )}

                        {item?.is_verified === 0 && (
                          <button type="button" className="table-btn warning">
                            Pending
                          </button>
                        )}
                        {(item?.is_verified === 1  || item?.is_verified === 2) && (
                          <>
                            <div className="drop-start">
                              <div
                                className="dropdown-toggle btn btn-secondary"
                                ref={countryDropdownRef}
                                onClick={() => toggleCountryOptions(item._id)}
                                
                              >
                                <SimpleDotedIcon width="20" height="20" />
                              </div>

                              {(isDropdownVisible  && selectedItem === item._id)  && (
                                <>
                                  <div className="dropdown-menu show">
                                    <button
                                      className="btn btn-link"
                                      onClick={() => modalToggle(item?._id)}
                                      variant="gradient"
                                    >
                                      <EyeIcon width="22" height="22" /> View
                                      Details
                                    </button>

                                    <button
                                      className="btn btn-link"
                                      onClick={() => deleteUserKyc(item?._id)}
                                    >
                                      <TrashIcon width="22" height="20" />
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        )}
                        
                        {item?.is_verified === 0 && (
                          <>
                            <div className="drop-start">
                              <div
                                className="dropdown-toggle btn btn-secondary"
                                //ref={optionsDropdownRef}
                                onClick={() => toggleOptions(item._id)}
                              >
                                <SimpleDotedIcon width="20" height="20" />
                              </div>

                              {(showOptions && selectedPendingItem === item._id) && (
                                <>
                                  <div className="dropdown-menu show">
                                    <button
                                      className="btn btn-link"
                                      onClick={() => modalToggle(item?._id)}
                                      variant="gradient"
                                    >
                                      <EyeIcon width="22" height="22" /> View
                                      Details
                                    </button>

                                    {item?.is_verified === 0 && (
                                      <>
                                        <button
                                          className="btn btn-link"
                                          onClick={() =>
                                            acceptUserKyc(item?._id)
                                          }
                                        >
                                          <CheckBoxIcon
                                            width="22"
                                            height="15"
                                          />
                                          Approve
                                        </button>
                                        <button
                                          className="btn btn-link"
                                          onClick={() =>
                                            rejectUserKyc(item?._id)
                                          }
                                        >
                                          <CancelIcon
                                            width="22"
                                            height="16"
                                          />
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    <button
                                      className="btn btn-link"
                                      onClick={() => deleteUserKyc(item?._id)}
                                    >
                                      <TrashIcon width="22" height="20" />
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}

                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {totalUsersCount === 0 && kycLoading === false && (
                  <div className="flex-table-body no-records justify-content-between">
                    <div className="no-records-text">
                      <div className="no-record-label">No Records</div>
                      <p>You haven't any KYC records</p>
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

      <Dialog
        open={modalShow}
        className="modal-content"
      >
        <DialogHeader className="transaction-header modal-header">
          <div className="modal-title h4">
            KYC Detail
            {/* <span className="table-btn cancelled">Pending</span> */}
            <>
              {viewKYC?.user?.is_verified === 1 && (
                <button className="btn btn-outline-success">Approved</button>
              )}
              {viewKYC?.user?.is_verified === 2 && (
                <button className="btn btn-outline-danger">Rejected</button>
              )}
              {viewKYC?.user?.is_verified === 0 && (
                <button className="btn btn-outline-warning">Pending</button>
              )}
            </>
          </div>
          <button
            variant="text"
            onClick={() => setModalShow(false)}
            className="btn-close"
          >
            <img src={close} alt="img" />
          </button>
        </DialogHeader>
        <div className="kyc-details-body modal-body">
          {
            <>
              {viewKYC?.user?.kyc_submitted_date && (
                <p className="mb-kyc">
                  Submitted By{" "}
                  <span className="text-white">
                    {hideAddress(viewKYC?.user?.wallet_address, 5)}
                  </span>
                  , on{" "}
                  <span className="text-white">
                    {getDateFormate(viewKYC?.user?.kyc_submitted_date)}
                  </span>
                </p>
              )}
              {viewKYC?.user?.admin_checked_at && (
                <p>
                  Checked by <span className="text-white">Admin</span>, on{" "}
                  <span className="text-white">
                    {getDateFormate(viewKYC?.user?.admin_checked_at)}
                  </span>
                </p>
              )}
            </>
          }

          <h3>Personal Information</h3>
          <div className="token-details">
            <div className="table-responsive">
              <table className="table" responsive>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{viewKYC?.user?.fname ? viewKYC?.user?.fname : "-"}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{viewKYC?.user?.lname ? viewKYC?.user?.lname : "-"}</td>
                  </tr>
                  <tr>
                    <th>Email Address</th>
                    <td>{viewKYC?.user?.email ? viewKYC?.user?.email : "-"}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>
                      {viewKYC?.user?.phone &&
                        viewKYC?.user?.phoneCountry + " "}
                      {viewKYC?.user?.phone ? viewKYC?.user?.phone : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td> {formattedDate ? formattedDate : "-"}</td>
                  </tr>
                  <tr>
                    <th>Full Address</th>
                    <td>
                      {viewKYC?.user?.res_address
                        ? viewKYC?.user?.res_address
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{foundCountry ? foundCountry : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap justify-between ">
            <h3>Upload Documents</h3>
            <h3>
              {viewKYC?.user?.verified_with === "government-passport"
                ? "National Id Card"
                : "Driving License"}{" "}
            </h3>
          </div>
          <div className="token-details">
            <div className="table-responsive">
              <table className="table" responsive>
                <tbody>
                  <tr>
                    <th>Document Image</th>
                    <td>User Image</td>
                  </tr>
                  <tr>
                    <th>
                      <div>
                        <img
                          src={
                            viewKYC?.passport_url
                              ? viewKYC?.passport_url
                              : require("../../assets/images/no-image.png")
                          }
                          className="doc-img"
                        />
                      </div>
                    </th>
                    <td>
                      <div>
                        <img
                          src={
                            viewKYC?.user_photo_url
                              ? viewKYC?.user_photo_url
                              : require("../../assets/images/no-image.png")
                          }
                          className="doc-img"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Kyclist;
