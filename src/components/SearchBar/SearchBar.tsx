import { useState } from "react";
import "./SearchBar.css";
import { FilterMenu } from "./FilterMenu";
import { Formik, Form, Field } from "formik";
import {
  configureHistory,
  configureSearch,
  setSearchResults,
  setSearchError,
} from "../../store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { TypeFilters } from "../../http/characterTypes";
import { fetchFilteredCharacters } from "../../http/characterAPI";
import { searchConfig, searchError } from "../../utils/selectors";
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constants";

export const SearchBar: React.FC<{ filterPosition: string }> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const initialValues = useSelector(searchConfig);
  const error = useSelector(searchError)
  const handleSubmit = async (values: TypeFilters) => {
    try {
      dispatch(configureSearch(values));
      dispatch(setSearchError(""))
      const data = await fetchFilteredCharacters(values);
      dispatch(setSearchResults(data));
      if (values.name) {
        dispatch(configureHistory(values));
      }
    } catch (error) {
      dispatch(setSearchError(error.code));
      dispatch(
        configureHistory({
          ...values,
          error: "Error. Something went terribly wrong.",
        })
      );
    } finally {
      navigate(PATHS.SEARCH);
    }
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
