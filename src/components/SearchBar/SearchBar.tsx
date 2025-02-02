import { useState } from "react";
import "./SearchBar.css";
import { FilterMenu } from "./FilterMenu";
import { Formik, Form, Field } from "formik";
import { configureSearch, setSearchResults, setSearchError } from "../../store/searchSlice";
import { useDispatch } from "react-redux";
import { TypeFilters } from "../../http/characterTypes";
import { fetchFilteredCharacters } from "../../http/characterAPI";

export const SearchBar: React.FC<{ filterPosition: string }> = (props) => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const initialValues:  TypeFilters = {
    name: "",
  }
  const handleSubmit = (values:  TypeFilters) => {
    dispatch(configureSearch(values))
    fetchFilteredCharacters(values).then((data) => dispatch(setSearchResults(data))).catch((error)=> {dispatch(setSearchError(error))})
  };
  const dropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
     <Form className="searchbar">
      <button
        className="searchbar_filter"
        type="button"
        onClick={dropdownToggle}
      >
        Filter
      </button>
      {dropdownVisible ? <FilterMenu position={props.filterPosition} /> : <></>}
      <Field
        type="text"
        name="name"
        className="searchbar_input"
        placeholder="Type here..."
      />

      <button className="searchbar_submit" type="submit">
        Search
      </button>
     </Form>
    </Formik>
  );
};
