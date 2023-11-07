import React from "react";
import dot from "../../assets/images/dots.svg";
import Smiley from "../../assets/images/Smiley.svg";
import Attachment from "../../assets/images/Attachment.svg";


import { Link } from "react-router-dom";
import ManageEscrowDetailsUser from "./ManageEscrowDetailsUser";
import profileImage from "../../assets/images/profile-pic.png";
function ManageEscrowDetails() {

  const buyer = [
    {
      title:"Buyer",
      ans:"Abdul Qadeer"
    },
    {
      title:"Seller",
      ans:"Gabriel  Erickson "
    },
    {
      title:"Amount",
      ans:"50.00 USD "
    },
    {
      title:"Charge",
      ans:"3.00 USD"
    },
    {
      title: "Charge Payer",
      ans: (
        <span className="border bg-[#55b2e733] rounded-[45px] border-solid border-[#55B2E7] w-[103px] inline-block text-center text-[#55B2E7] text-xs font-bold leading-5">
          Seller
        </span>
      ),
    },
    {
      title: "Status",
      ans: (
        <span className="border bg-[#D8D8D833] rounded-[45px] border-solid border-[#D8D8D8] w-[101px] inline-block text-center text-[#D8D8D8] text-xs font-bold leading-5">
          Not Accepted
        </span>
      ),
    },
    {
      title: "Milestone Created",
      ans: "0.00 USD",
    },
    {
      title: "Milestone Funded",
      ans: "0.00 USD",
    },
    {
      title: "Milestone unfunded",
      ans: "0.00 USD",
    },
    {
      title: "Rest Amount",
      ans: "50.00 USD",
    },
  ]

  const [leftComponent,setLeftComponent] = React.useState("buyer"); 
  
  const backToDetailHandler = () => {
    setLeftComponent("buyer");
  }

  const viewMilestoneHandler = () => {
    setLeftComponent("milestone")
  }

  return (
    <div className="ManageEscrowDetails flex flex-wrap">
      {leftComponent == "buyer" && <div className="contact w-full lg:w-[35.4%]">
        <div className="card bg-[#18191D] rounded-[32px] px-4 xl:px-8 py-[35px] lg:min-h-[588px] flex flex-col justify-between">
            <div className="top">
              <div className="flex flex-wrap justify-between items-center mb-[17px] gap-2">
                <h3 className="text-white text-lg font-medium leading-6">Contract : <span className="font-bold text-[#AEFB69]">Buyer</span> </h3>
                <span className="py-[6px] px-4 text-[#FFC246] bg-[rgba(255,194,70,0.18)] rounded-[5px]">Depositing</span>
              </div>
              <div className="list">
                {
                  buyer.map((row,i)=>(
                    <div key={i} className="flex flex-wrap items-center mb-6 justify-between buyerRow">
                      <span className="text-[#808191] text-[13px] font-medium leading-[18px]">{row.title}</span>
                      <strong className="text-white text-[13px] font-medium leading-[18px] w-[110px]">{row.ans}</strong>
                    </div>
                  ))
                }
              </div>
            </div>
            <button className="GradiantBtn inline-block w-full mt-1" onClick={viewMilestoneHandler}>View Millestone</button>
        </div>
      </div>}
      {leftComponent == "milestone" && 
        <ManageEscrowDetailsUser backToDetail={backToDetailHandler} />
      }
      <div className="checkbox w-full lg:w-[64.6%] lg:pl-7 xl:pl-10 mt-7 lg:mt-0">
        <div className="rounded-[32px] bg-[#18191d]">
          <div className="flex flex-wrap justify-between items-center pb-[11px] pt-3 px-[23px]">
            <h3 className="text-white text-lg font-medium leading-6 m-0">
              Chatbox
            </h3>
            <span className="toggle h-14 w-14 bg-[#1B1C1F] rounded-xl flex items-center justify-center">
              <img src={dot} alt="dots" />
            </span>
          </div>

          <div className="innercheckbox">
            <h2 className="bg-[#1E1E21] h-[52px] flex items-center overflow-hidden text-white px-[23px] py-0 rounded-[20px_20px_0px_0] m-0 text-[13px] font-medium leading-[18px] text-left">
              Moderator
              <span className="mx-2 text-[#808191]">Unavailable</span>
              <span className="text-[#808191] w-1.5 h-1.5 bg-[#EC6060] inline-block rounded-[5px]"></span>
            </h2>
            <div className="mainChatBox pt-[13px] px-4 lg:px-8 pb-8">
                <div className="chatContentBox h-[455px] overflow-y-auto pr-4 lg:pr-8">
                  <div className="mainchatRow flex flex-wrap">
                    <div className="chatContent">                  
                      <div className="innerChatContent">
                        <p className="title">
                          You <span>3m ago</span>
                        </p>
                        <div className="box">
                          <p>Lorem ipsum dolor sit amet </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mainchatRow flex flex-wrap">
                    <div className="chatContent">
                      <span className="img">
                        <img src={profileImage}/>
                      </span>
                      <div className="innerChatContent">
                        <p className="title">
                          Gabriel Erickson <span>3m ago</span>
                        </p>
                        <div className="box">
                          <p>Lorem ipsum dolor sit amet </p>
                        </div>
                      </div>
                    </div>
                  </div>              

                  <div className="mainchatRow flex flex-wrap">
                    <div className="chatContent">                  
                      <div className="innerChatContent">
                        <p className="title">
                          You <span>3m ago</span>
                        </p>
                        <div className="box">
                          <p>Lorem ipsum dolor sit amet </p>
                        </div>
                        <div className="chatSquer">
                          <div className="w-[200px] sm:w-[227px] h-[134px] bg-[#2d2d31] rounded-[20px]">
                          </div>
                          <div className="w-[200px] sm:w-[227px] h-[134px] bg-[#2d2d31] rounded-[20px]">
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="sendMessage bg-[#1F2128] rounded-[25px] p-3 pl-3 lg:pl-8 mt-[15px] sm:mt-[29px] flex relative overflow-hidden">
                  <button className="mr-[10px] lg:mr-[15px] xl:mr-[26px] z-[1] relative"><img src={Smiley} alt="smile" /></button>
                  <button className="z-[1] relative"><img src={Attachment} alt="smile" /></button>
                  <input type="text" className="absolute h-full w-full bg-transparent pl-[70px] lg:pl-[85px] xl:pl-[123px] pr-[80px] lg:pr-[120px] xl:pr-[150px] py-0 left-0 top-0 text-[#FFF] resize-none overflow-hidden border-[none]" placeholder="Send a message…" />
                  <button type="submit" className="z-[1] relative bg-color text-[#1F2128] text-center text-sm font-bold leading-5 py-[10px] lg:py-[18px] px-[10px] sm:px-[30px] xl:px-[43px] rounded-2xl ml-auto">Send</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEscrowDetails;
