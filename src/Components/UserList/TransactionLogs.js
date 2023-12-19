import React, { useState , useEffect, useRef} from "react";
import SearchBar from "../SearchBar";
import TransactionLogsTable from "./TransactionLogsTable";

function TransactionLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [graphOptions, setGraphOptions] = useState([]);
  const [remarkOptions, setRemarkOptions] = useState([]);
  const [filterValue, setFilterValue] = useState("Type");
  const [filterRemark, setFilterRemark] = useState("Remark");
  const [showOptions, setShowOptions] = useState(false);
  const [showRemarkOptions, setShowRemarkOptions] = useState(false);
  const countryDropdownRef = useRef(null);
  const optionsDropdownRef = useRef(null);

  const handleGlobalClick = (event) => {
    // Close dropdowns if the click is outside of them
    if (
      countryDropdownRef.current &&
      !countryDropdownRef.current.contains(event.target) &&
      optionsDropdownRef.current &&
      !optionsDropdownRef.current.contains(event.target)
    ) {
      setShowRemarkOptions(false);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    // Add global click event listener
    document.addEventListener('click', handleGlobalClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowRemarkOptions(false);
  };

  useEffect(() => {
    setGraphOptions([
      {
        label: "Type",
        value: "Type",
      },
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      }
    ]);
    setRemarkOptions([
      {
        label: "Remark",
        value: "Remark",
      },
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      }
    ])
  }, []);

  const handleSelectedClick = (value) => {
    setFilterValue(value);
    setShowOptions(false);
  };

  const toggleRemarkOptions = () => {
    setShowRemarkOptions(!showRemarkOptions);
    setShowOptions(false)
  };

  const handleSelectedRemarkClick = (value) => {
    setFilterRemark(value);
    setShowRemarkOptions(false);
  };

  return (
    <>
      <div className="userTransaction">
        <h1 className="maintitle">Transaction Logs</h1>
        <div className="flex flex-wrap gap-[11px] justify-between mb-[15px]">
          
        <SearchBar placeholder="Transaction ID" setSearchQuery={setSearchQuery} />

          <div className="flex flex-wrap gap-[11px] items-start">
            {/* <div className="custom-select common-box">
              <select>
                <option value="Type">Type</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div> */}
    
            {/* <div className="custom-select common-box">
              <select name="" id="">
                <option value="Type">Remark</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div> */}

            <div className="customSelectBox" ref={countryDropdownRef}>
              <div
                className="form-select"
                onClick={toggleOptions}
              >
                {graphOptions.find((cat) => cat.value === filterValue)
                  ?.label || ""}
              </div>
              {showOptions && (
                <ul className="options">
                  {graphOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleSelectedClick(option.value);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="customSelectBox" ref={optionsDropdownRef}>
              <div
                className="form-select"
                onClick={toggleRemarkOptions}
              >
                {remarkOptions.find((cat) => cat.value === filterRemark)?.label || ""}
              </div>
              {showRemarkOptions && (
                <ul className="options">
                  {remarkOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {handleSelectedRemarkClick(option.value);}}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="common-box flex flex-wrap items-center">
              <span className="icon w-6 h-6 bg-[#C4C4C4] inline-block rounded-full mr-[5px]"></span>
              Date
            </div>
            <div className="common-box text-center filter">Filter</div>
          </div>
        </div>
        <TransactionLogsTable searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default TransactionLogs;
