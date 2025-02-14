import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchConfig, setSearchError } from "../store/searchSlice";
import { searchError } from "../utils/selectors";

export const useClearOnUnmount = () => {
  const firstRender = useRef(true);
  const thereWasAnError = useRef('');
  const dispatch = useDispatch();
  const error = useSelector(searchError);
  useEffect(() => {
    if (firstRender.current) {
      thereWasAnError.current = error;
      firstRender.current = false;
      return;
    }
    if (error) {
      dispatch(setSearchError(error))
      thereWasAnError.current = '';
    }

    return () => {
      dispatch(clearSearchConfig());
    };
  }, []);
};
