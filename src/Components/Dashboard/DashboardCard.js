import React,{useState} from "react";

import arrowup from "../../assets/images/arrow-up-green.svg";
import arrowdown from "../../assets/images/arrow-down-red.svg";

function DashboardCard() {
  const dashboardcard = [
    {
      title: "Total Escrowed Amount",
      price: "$100,000",
      img: arrowup,
      budget: "200+",
      day: "from yesterday",
    },
    {
      title: "Escrowed Funded",
      price: "$ 38. 976.00",
      img: arrowup,
      budget: "4.8%",
      day: "from yesterday",
    },
    {
      title: "Canceled Escrow",
      price: "20",
      img: arrowdown,
      budget: "4.8%",
      day: "from yesterday",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {dashboardcard.map((event, i) => (
        <div key={i} className={`common-card cursor-pointer mb-[24px] xl:mb-0 w-[calc(100%_-_24px)] sm:w-[calc(50%_-_24px)] xl:w-[calc(33.33%_-_24px)] mx-3 my-0 ${i === activeIndex ? 'active' : ''}`}>
          <p className="title text-sm leading-6 font-medium">{event.title}</p>
          <h2 className="text-2xl leading-5 font-bold mx-0 my-5">{event.price}</h2>
          <div className="flex items-center flex-wrap">
            <span className={`budget flex items-center flex-wrap px-1.5 py-0 rounded-3xl text-sm ${i === dashboardcard.length - 1 ? "denger-box" : "" }`}>
              <img src={event.img} alt="img" className="mr-[-3px]" />
              {event.budget}
            </span>
            <span className="day text-sm pl-[6px]">{event.day}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default DashboardCard;
