import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie.js";
import { useDispatch, useSelector } from "react-redux";
import { getUsersCount } from "../../store/slices/UserSlice";

VariablePie(Highcharts);

const colors = ["#F7931A", "#627EEA", "#F3BA2F", "#151A20"];
const options = {
  chart: {
    type: "variablepie",
    colors: colors,
    height: 213,
    width: 213,
    backgroundColor: null,
    margin: [0,0,0,0],
    spacingTop: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    spacingRight:15,
  },
  colors: colors,
  title: {
    text: "73%",
    align: "center",
    verticalAlign: "middle",
    y: 25,
    x: 5,
    style: {
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "22px",
    },
  },
  tooltip: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      minPointSize: 20,
      innerSize: "50%",
      borderWidth: 0,
      zMin: 0,
      name: "Sales per month",
      dataLabels: {
        enabled: false,
      },
      data: [
        {
          name: "Bitcoin",
          y: 150,
          z: 80,
        },
        {
          name: "ETHER",
          y: 60,
          z: 40,
        },
        {
          name: "BNB",
          y: 50,
          z: 30,
        },
        {
          name: "",
          y: 50,
          z: 20,
        },
      ],
    },
  ],
};

export const UserPieChart = () => {

  const dispatch = useDispatch();

  const authToken = useSelector(
    (state) => state.authenticationReducer?.authToken
  );
  const totalUser = useSelector(
    (state) => state.userReducer?.totalUser
  );

  useEffect(() => {
    if (authToken) {
      dispatch(getUsersCount());
    };
  }, [authToken]);

  return (
    <div className="common-card userDetailchart lg:h-full text-center mt-[29px] lg:mt-[0]">
      <h3 className="text-left text-white text-sm font-medium leading-5 pt-5 pb-[30px] px-5">User Detail</h3>
      
      <div className="inline-block mx-auto">
        <div className="chartBox relative">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>      
        <div className="totaluser">
            <h3 className="text-left text-white text-xl font-medium leading-[normal] mb-[22px]">Total Users : {totalUser}</h3>

            <div className="item">
                <p><span className="item-bar bitcoin"></span>Active Users </p>
                <span className="number">200</span>
            </div>
            <div className="item">
                <p><span className="item-bar ether"></span>Email Unverified </p>
                <span className="number">42</span>
            </div>
            <div className="item">
                <p><span className="item-bar bnb"></span>Mobile Unverified </p>
                <span className="number">2</span>
            </div>
        </div>
      </div>


    </div>
  );
};

export default UserPieChart;
