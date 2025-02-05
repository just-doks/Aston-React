import "./CharacterSlider.css";
import { CharacterCard } from "../CharacterCard";
import { SvgButton } from "../../assets";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchError, searchResults } from "../../utils/selectors";
import { setSearchResults, setSearchError } from "../../store/searchSlice";
import { fetchCharacterPage } from "../../http/characterAPI";

export const CharacterSlider = () => {
  const dispatch = useDispatch();
  const error = useSelector(searchError);
  const response = useSelector(searchResults);
  const characters = response?.results || [];
  const nextPage = response?.info.next;
  const prevPage = response?.info.prev;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isMounted) {
      throw new Error(error);
    } else {
      setIsMounted(!isMounted);
    }
  }, [error]);

  const handlePreviousPage = async () => {
    try {
      const data = await fetchCharacterPage(prevPage);
      dispatch(setSearchResults(data));
    } catch (error) {
      dispatch(setSearchError(error));
    }
  };
  const handleNextPage = async () => {
    try {
      const data = await fetchCharacterPage(nextPage);
      dispatch(setSearchResults(data));
    } catch (error) {
      dispatch(setSearchError(error));
    }
  };

  return (
    <div className="character-slider">
      <button
        className="character-slider_button-back"
        onClick={handlePreviousPage}
      >
        <SvgButton />
      </button>
      <ul className="character-slider_items">
        {characters.map((character) => (
          <CharacterCard character={character} />
        ))}
      </ul>
      <button
        className="character-slider_button-forward"
        onClick={handleNextPage}
      >
        <SvgButton />
      </button>
    </div>
  );
};
