import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import DashboardTable from "./DashboardTable";
import UserPieChart from "./UserPieChart";
import { Link } from "react-router-dom";

function Dashboard() {
  const YearlyBox = ["Daily", "Weekly", "Monthly", "Yearly"];

  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#18191D",
      polar: true,
      height: 210,
    },    
    tooltip: {
      style: {
          display: "none",
      }
    },
    legend: {
      enabled: false, 
    },
    credits: {
      enabled: false, 
    },

    title: {
      text: "",
    },
    plotOptions: {
      series: {
        shadow: {
          color: "#7FFC8D",
          offsetX: 0,
          offsetY: 0,
          opacity: 0.5,
          width: 10,
        },        
      },
      spline: {
        marker: {
          enabled: false,
        },        
      },
    },
    xAxis: { 
      labels: {
        style: {
          fontWeight: "700", 
          fontFamily:"Eudoxus Sans",
          color: "rgba(255, 255, 255, 0.30)"
        },
      },
      lineWidth:0,     
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        format: "{value}k",
        style: {
          fontWeight: "700", 
          fontFamily:"Eudoxus Sans",
          color: "rgba(255, 255, 255, 0.30)"
        },
      },
      gridLineDashStyle: '80',
      gridLineWidth:'0.1',
      gridLineColor:'#edf1f7',
      tickPositions: [25, 50, 75, 100,125,150], // Define the custom tick positions
        tickPositioner: function () {
          return this.tickPositions;
        },       
    },
    
    series: [
      {
        name: "Tokyo",        
        color: "#7FFC8D",
        data: [75,90, 30, 40, 50, 78, 125,145,75,90, 30, 40],
        tooltip: false,
        marker: {
          symbol: "square",
        },
      },
    ],
  };
  
  const [activechart, setActiveChart] = useState(3);
  const ChartOnClick = (i) =>{
    setActiveChart(i === activechart ? null : i);
  }

  return (
    <>
      <h1 className="maintitle">Dashboard</h1>
      <div className="flex flex-wrap mb-[29px]">
        <div className="w-[100%] lg:w-[70%] xl:w-[75%] lg:pr-6">
          <div className="dashboard-smallcard flex flex-wrap -mx-3 xl:mb-[29px]">
            <DashboardCard />
          </div>
          <div className="monthly-deposite common-card">
            <div className="flex justify-between text-white items-center mb-[23px]">
              <h3 className="card-title">Monthly Deposit & Withdraw Report</h3>
              <ul className="flex gap-2">
                {YearlyBox.map((item, index) => (
                  <li
                    className={`border min-w-[75px] text-center cursor-pointer text-xs not-italic font-medium leading-5 text-white px-[5px] py-2 rounded-[9px] border-solid border-[#8C8C8C] ${index === activechart ? 'active' : ''}`}
                    onClick={() => ChartOnClick(index)} 
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[30%] xl:w-[25%]">
          <UserPieChart/>
        </div>
      </div>
      <div className="grid grid-cols-12 latestescrow">
        <div className="col-span-12">
          <div className="flex text-[#fff] items-center justify-between mb-[20px]">
            <h2 className="maintitle mb-0">Latest Escrow</h2>
            <h3 className="text-sm font-bold leading-5"><Link to={"/manageescrow"} >View all</Link></h3>
          </div>

          <DashboardTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
