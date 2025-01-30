import { useState } from "react";
import "./SearchBar.css";
import { FilterMenu } from "./FilterMenu";

export const SearchBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropdownToggle = () => {
        setDropdownVisible(!dropdownVisible)
    }
  return (
  <div className="searchbar">
    <button className="searchbar_filter" onClick={dropdownToggle}>Filter</button>
    <input type="text" className="searchbar_input" placeholder="Search..." />
    {dropdownVisible ? <FilterMenu/> : <></>}
  </div>
  )
};
