import React, { useState } from "react";
import Search from "../assets/images/search.svg";

function SearchBar({placeholder,setSearchQuery}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  return (
    <div className="tabSearch max-w-[357px] w-full">
      <div className="formControl relative">
        <input
          type="text"
          placeholder={placeholder}
          className="bg-[#282A2C] rounded-[13px] border-[none] h-14 w-full pl-[40px] text-white text-[13px] not-italic font-bold leading-5"
          
          value={inputValue}
          onChange={handleInputChange}

        />
        <button type="submit" className="absolute left-2.5 top-[17px]">
          <img src={Search} alt="" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
