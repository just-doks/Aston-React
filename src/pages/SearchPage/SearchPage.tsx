import { FC } from "react";
import "./SearchPage.css";
import { SearchBar } from "../../components/SearchBar";
import { CharacterSlider } from "../../components/CharacterList";

export const SearchPage: FC = () => {
  return (
    <div className="container searchpage-wrapper">
      <h1 className="searchpage-title">
        Search for your favorite characters right here!
      </h1>
      <SearchBar />
      <CharacterSlider />
    </div>
  );
};
