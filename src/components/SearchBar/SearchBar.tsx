import { useEffect, useState } from "react";
import "./SearchBar.css";
import { FilterMenu } from "./FilterMenu";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TypeFilters } from "../../http/characterTypes";
import { searchConfig } from "../../utils/selectors";
import { AppDispatch } from "../../store/store";
import { fetchFilteredCharactersThunk } from "../../store/searchThunks";
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constants";

export const SearchBar: React.FC<{ filterPosition: string }> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const initialValues = useSelector(searchConfig);
  const navigate = useNavigate()

  const handleSubmit = (values: TypeFilters) => {
    // navigate(PATHS.SEARCH)
    dispatch(fetchFilteredCharactersThunk({data: values, isWriteToHistory: true}))
    .then(() => {navigate(PATHS.SEARCH)})
    
  };

  const dropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      <Form className="searchbar">
        <button
          className="searchbar_filter"
          type="button"
          onClick={dropdownToggle}
        >
          Filter
        </button>
        {dropdownVisible ? (
          <FilterMenu position={props.filterPosition} />
        ) : null}
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
