import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import listData from "../countryData";
import jwtAxios from "../../service/jwtAxios";
import { useDispatch } from "react-redux";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";
import Swal from "sweetalert2/src/sweetalert2.js";

function UserDetails() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const { id } = useParams();
  const handleOpen = () => setOpen(!open);
  const [country, setCountry] = React.useState(" +1");
  const navigate = useNavigate();
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const Escrow = [
    {
      title: "Completed Escrow",
      number: "20",
    },
    {
      title: "Disputed Escrow",
      number: "1",
    },
    {
      title: "Canceled Escrow",
      number: "2",
    },
  ];

  const getUserDetails = async () => {
    await jwtAxios
      .get(`/users/getUserById/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setUser(response?.data?.User);
          if (response?.data.User?.phoneCountry) {
            setCountry(response?.data.User?.phoneCountry);
          }
        } else {
          navigate("/");
          notificationFail("Something went wrong");
        }
      })
      .catch((e) => {
        navigate("/");
        dispatch(notificationFail("Something went wrong"));
      });
  };

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setFname(user?.fname ? user?.fname : "");
      setLname(user?.lname ? user?.lname : "");
      setEmail(user?.email ? user?.email : "");
      setPhone(user?.phone ? user?.phone : "");
    }
  }, [user]);

  const phoneCountry = () => {
    const result = listData.find((item) => item?.code === country);
    return `https://flagcdn.com/h40/${result?.iso?.toLowerCase()}.png`;
  };

  const countryChange = (e) => {
    setCountry(e.target.value);
  };

  const dipositeViewDetailsHandler = () => {
    navigate("/userdeposithistory");
  };

  const balanceViewDetailsHandler = () => {
    navigate("/transactionlogs");
  };

  const onChange = (e) => {
    if (e.target.name === "fname") {
      setFname(e.target.value);
    } else if (e.target.name === "lname") {
      setLname(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      const value = e.target.value.replace(/\D/g, "");
      setPhone(value);
    }
  };

  const saveHandler = async () => {
    if (!fname) {
      dispatch(notificationFail("Please Enter First name"));
      return;
    }
    if (!lname) {
      dispatch(notificationFail("Please Enter Last name"));
      return;
    }
    if (!email) {
      dispatch(notificationFail("Please Enter Email"));
      return;
    }
    if (!phone) {
      dispatch(notificationFail("Please Enter Phone number"));
      return;
    }

    if (fname && email && lname && phone && country) {
      let formSubmit = {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        phoneCountry: country,
      };
      let response = await jwtAxios
        .put(`/users/updateUser/${id}`, formSubmit)
        .catch((error) => {
          if (typeof error == "string") {
            dispatch(notificationFail(error));
          }
          if (error?.response?.data?.message === "") {
            dispatch(notificationFail("Invalid "));
          }
          if (error?.response?.data?.message) {
            dispatch(notificationFail(error?.response?.data?.message));
          }
        });
      if (response) {
        setUser(response?.data.User);
        dispatch(notificationSuccess("User profile updated successfully !"));
      }
    }
  };

  const banUserHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Ban this user?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes",
      customClass: {
        popup: "suspend",
      },
    }).then(async (result) => {});
  };

  const twoFADisableHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to disable this user's google 2FA?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#808080",
      confirmButtonText: "Disable",
      customClass: {
        popup: "suspend",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await jwtAxios
          .post(`/users/twoFADisableUser/${id}`, {})
          .catch((error) => {
            if (typeof error == "string") {
              dispatch(notificationFail(error));
            }
            if (error?.response?.data?.message === "") {
              dispatch(notificationFail("Invalid "));
            }
            if (error?.response?.data?.message) {
              dispatch(notificationFail(error?.response?.data?.message));
            }
          });
        if (response?.data?.User) {
          setUser(response?.data.User);
          Swal.fire("Disabled!", response?.data?.message, "success");
        }
      }
    });
  };

  return (
    <>
      <div className="mainuserdetails">
        <h1 className="maintitle">
          User Detail - {user?.fname} {user?.lname}
        </h1>
        <div className="flex flex-wrap gap-[2%] UserDetailMainRow">
          <div className="UserDetailLeft">
            <div className="userdetails-smallcard grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              <div className={`common-card active`}>
                <div className="flex flex-wrap justify-between mb-[23px]">
                  <span className="title text-xs not-italic font-medium leading-5">
                    Balance
                  </span>
                  <button
                    className="rounded-[24.594px] border-[none] py-[2px] px-2 text-xs not-italic font-medium leading-5"
                    onClick={balanceViewDetailsHandler}
                  >
                    View detail
                  </button>
                </div>
                <h2 className="text-white text-xl not-italic font-bold leading-5">
                  $1,000.00
                </h2>
              </div>
              <div className={`common-card`}>
                <div className="flex flex-wrap justify-between mb-[23px]">
                  <span className="title text-xs not-italic font-medium leading-5">
                    Deposited
                  </span>
                  <button
                    className="rounded-[24.594px] border-[none] py-[2px] px-2 text-xs not-italic font-medium leading-5"
                    onClick={dipositeViewDetailsHandler}
                  >
                    View detail
                  </button>
                </div>
                <h2 className="text-white text-xl not-italic font-bold leading-5">
                  $1,000.00
                </h2>
              </div>
              <div className={`common-card`}>
                <div className="flex flex-wrap justify-between mb-[23px]">
                  <span className="title text-xs not-italic font-medium leading-5">
                    Withdrawan
                  </span>
                  <button className="rounded-[24.594px] border-[none] py-[2px] px-2 text-xs not-italic font-medium leading-5">
                    View detail
                  </button>
                </div>
                <h2 className="text-white text-xl not-italic font-bold leading-5">
                  $0.00
                </h2>
              </div>
            </div>

            <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {Escrow.map((items, i) => (
                <div className="common-card active" key={i}>
                  <p className="text-white text-xs not-italic font-medium leading-5 mb-[27px]">
                    {items.title}
                  </p>
                  <h3 className="text-white text-xl not-italic font-bold leading-5">
                    {items.number}
                  </h3>
                </div>
              ))}
            </div>

            <div className="userInformation bg-[#18191D] px-4 xl:px-8 py-[33px] rounded-[32px]">
              <h2 className="card-title text-lg">User Information</h2>
              <div className="userInformationcard -mx-2 my-0 flex flex-wrap">
                <div className="innercard">
                  <p className="title">First name (required)</p>
                  <input
                    type="text"
                    className="bg-transparent text-white w-full mt-[5px] mb-0 mx-0"
                    name="fname"
                    value={fname}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="innercard">
                  <p className="title">Last name (optional)</p>
                  <input
                    type="text"
                    className="bg-transparent text-white w-full mt-[5px] mb-0 mx-0"
                    name="lname"
                    value={lname}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="innercard email">
                  <p className="title">Email (required)</p>
                  <input
                    type="text"
                    className="bg-transparent text-white w-full mt-[5px] mb-0 mx-0"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="innercard phonenumber">
                  <p className="title">Phone number (required)</p>
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="bg-transparent text-white w-full mt-[5px] mb-0 mx-0"
                      name="phone"
                      placeholder="+1"
                      value={phone}
                      onChange={(e) => onChange(e)}
                    />
                    <div className="country flex items-center">
                      <span className="img w-8 h-8 rounded-full inline-block mr-[4px] bg-[#fff] overflow-hidden">
                        <img
                          src={phoneCountry()}
                          alt="Flag"
                          className="circle-data h-full w-full object-cover"
                        />
                      </span>
                      <p className="text-[16px] text-white mx-1">
                        {listData.find((item) => item?.code === country)?.cca3}
                      </p>
                      <select label="Select Version" onChange={countryChange}>
                        {listData.map((data) => (
                          <option
                            value={`${data?.code}`}
                            key={`${data?.code}_${data?.country}`}
                          >
                            {data?.country} ({data?.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-2 my-0 mt-6 gap-4 sm:gap-0">
                <button
                  className="GradiantBtn w-[calc(100%_-_20px)] sm:w-[calc(50%_-_20px)] mx-2.5 my-0"
                  onClick={saveHandler}
                >
                  Save
                </button>
                <button
                  className="PinkBtn w-[calc(100%_-_20px)] sm:w-[calc(50%_-_20px)] mx-2.5 my-0"
                  onClick={banUserHandler}
                >
                  Ban User
                </button>
              </div>
            </div>
          </div>
          <div className="UserDetailRight">
            <div className="bg-[#18191D] userInformationRight rounded-[26px] h-full">
              <div className="mb-5">
                <h3 className="text-white mb-[18px]">User Information</h3>
                <div className="pb-3 border-b-[rgba(222,222,222,0.19)] border-b border-solid">
                  <div className="mb-4 relative verification-row  flex flex-wrap justify-between">
                    <div className="sm:pr-[120px] sm:w-full lg:min-h-[52px]">
                      <h4 className="text-white mb-[7px]">
                        Email Verification
                      </h4>
                      <span className="text-[rgba(255,255,255,0.60)] text-sm font-normal leading-[23px]">
                        Verified
                      </span>
                    </div>
                    <button className="sm:absolute top-0 right-0 GradiantBtn">
                      Verified
                    </button>
                  </div>
                  <div className="mb-4 relative verification-row  flex flex-wrap justify-between">
                    <div className="sm:pr-[120px] sm:w-full lg:min-h-[52px]">
                      <h4 className="text-white mb-[7px]">
                        Mobile Verification
                      </h4>
                      <span className="text-[rgba(255,255,255,0.60)] text-sm font-normal leading-[23px]">
                        Verified
                      </span>
                    </div>
                    <button className="sm:absolute top-0 right-0 GradiantBtn">
                      Verified
                    </button>
                  </div>
                  <div className="mb-4 relative verification-row  flex flex-wrap justify-between">
                    <div className="sm:pr-[120px] sm:w-full lg:min-h-[52px]">
                      <h4 className="text-white mb-[7px]">2FA Verification</h4>
                      <span className="text-[rgba(255,255,255,0.60)] text-sm font-normal leading-[23px]">
                        {user.is_2FA_enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <button
                      className="sm:absolute top-0 right-0 PinkBtn"
                      onClick={twoFADisableHandler}
                      disabled={!user.is_2FA_enabled}
                    >
                      {user.is_2FA_enabled ? "Disable" : "Disabled"}
                    </button>
                  </div>
                  <div className="mb-4 relative verification-row  flex flex-wrap justify-between">
                    <div className="sm:pr-[120px] sm:w-full lg:min-h-[52px]">
                      <h4 className="text-white mb-[7px]">KYC</h4>
                      <span className="text-[rgba(255,255,255,0.60)] text-sm font-normal leading-[23px]">
                        Verified
                      </span>
                    </div>
                    <button className="sm:absolute top-0 right-0 GradiantBtn">
                      Verified
                    </button>
                  </div>
                </div>
              </div>
              <div className="UserManagement">
                <h3 className="text-white mb-5">User Management</h3>
                <ul className="flex flex-wrap gap-2 flex-col">
                  <li className="">
                    <Link onClick={handleOpen} variant="gradient">
                      Edit Balance
                    </Link>
                  </li>
                  <li>
                    <Link to={`/userloginhistory/${id}`}>Logins Log</Link>
                  </li>
                  <li className="">
                    <Link to="">Notification</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        className="EditBalanceModal max-w-[586px] bg-[#1E1F24] p-8"
      >
        <DialogHeader className="text-white text-lg not-italic font-medium leading-6 p-0 pb-4">
          Amount
        </DialogHeader>
        <DialogBody
          divider
          className="p-0 mb-[62px] border-none text-[rgba(255,255,255,0.60)] text-sm not-italic font-normal leading-[23px]"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo
            lentesque consectetur adipiscing elit.
          </p>
          <div className="pricebox rounded-lg bg-[#202127] py-[15px] px-4 mt-6">
            <h3 className="text-[rgba(255,255,255,0.60)] text-xs not-italic font-bold leading-[18px] mb-[3px]">
              Amount
            </h3>
            <div className="flex flex-wrap items-center justify-between">
              <input
                type="text"
                className="h-[42px] w-[182px] bg-transparent text-white text-base not-italic font-normal leading-[42px] font-family: Inter;"
                placeholder="0.0"
              />
              <label className="text-white text-lg not-italic font-medium leading-6">
                USD
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="p-0 grid grid-cols-2 gap-[10px]">
          <Button variant="gradient" onClick={handleOpen} className="btn">
            Save
          </Button>

          <Button variant="text" onClick={handleOpen} className="btn">
            Back
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default UserDetails;
