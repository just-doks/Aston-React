import { FC } from "react";
import "./SearchPage.css";
import { SearchBar } from "src/components/SearchBar";
import { CharacterSlider } from "../../components/CharacterList";
import { SearchErrorBoundary } from "../../components/ErrorBoundary/SearchErrorBoundary";
import { useClearOnUnmount } from "../../hooks/useClearOnUnmount";

export const SearchPage: FC = () => {
  useClearOnUnmount()
  return (
    <div className="searchpage-wrapper container">
      <h1 className="searchpage-title">
        Search for your favorite characters right here!
      </h1>
      <SearchBar filterPosition="bottom" />
      <SearchErrorBoundary>
        <CharacterSlider />
      </SearchErrorBoundary>
    </div>
  );
};