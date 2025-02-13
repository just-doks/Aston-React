import { FC , lazy, Suspense } from "react";
import "./SearchPage.css";
import { SearchBar } from "src/components/SearchBar";
import { SearchErrorBoundary } from "../../components/ErrorBoundary/SearchErrorBoundary";
import { useClearOnUnmount } from "../../hooks/useClearOnUnmount";
import { PlanetSpinner } from "../../assets/PlanetSpinner";
const LazySlider = lazy(() => import("../../components/CharacterList").then(res => ({ default: res.CharacterSlider })));


const SuspenseSpinner: FC = () => {
  return <div className="suspense-spinner"><PlanetSpinner className="suspense-spinner" /></div>
}
export const SearchPage: FC = () => {
  useClearOnUnmount();
  return (
    <div className="searchpage-wrapper container">
      <h1 className="searchpage-title">
        Search for your favorite characters right here!
      </h1>
      <SearchErrorBoundary>
        <SearchBar filterPosition="bottom" />
        <Suspense fallback={<SuspenseSpinner />}>
          <LazySlider />
        </Suspense>
      </SearchErrorBoundary>
    </div>
  );
};
