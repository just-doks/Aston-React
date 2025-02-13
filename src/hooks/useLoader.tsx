import { useEffect, useState } from "react";
import { PlanetSpinner } from "#presentationals/PlanetSpinner";
import { isLoading } from "../utils/selectors";
import { useSelector } from "react-redux";

export const useLoader = () => {
  const isLoadingFlag = useSelector(isLoading);
  const [showLoader, setShowLoader] = useState(false);
  const delay = 500;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoadingFlag) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      setShowLoader(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoadingFlag]);

  return showLoader ? (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <PlanetSpinner />
      </div>
    </div>
  ) : null;
};
