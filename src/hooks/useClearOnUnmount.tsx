import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSearchConfig } from "../store/searchSlice";

export const useClearOnUnmount = () => {
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    return () => {
      dispatch(clearSearchConfig());
    };
  });
};
