import { PlanetSpinner } from "../assets/PlanetSpinner";
import { isLoading } from "../utils/selectors";
import { useSelector } from "react-redux";

export const useLoader = () => {
  const isLoadingFlag = useSelector(isLoading);

  return isLoadingFlag ? (
    <div className="loader-overlay">
        <div className="loader-spinner">
            <PlanetSpinner/>
        </div>
    </div>
  ) : null;
};
