import "./CharacterSlider.css";
import { CharacterCard } from "../CharacterCard";
import { SvgButton } from "../../assets";
import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchError, searchResults } from "../../utils/selectors";
import { AppDispatch } from "../../store/store";
import { fetchCharacterPageThunk, fetchIfEmptyThunk } from "../../store/searchThunks";

export const CharacterSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const response = useSelector(searchResults);
  const error = useSelector(searchError)
  const characters = response?.results || [];
  const nextPage = response?.info?.next
  const prevPage = response?.info?.prev

  useLayoutEffect(() => {
    if (error) {
      throw new Error(error);
    }
    dispatch(fetchIfEmptyThunk())
  }, [error]);

  const handlePreviousPage = () => {
    dispatch(fetchCharacterPageThunk("prevPage"))
  };
  const handleNextPage = () => {
    dispatch(fetchCharacterPageThunk("nextPage"))
  };

  return (
    <div className="character-slider">
      <button
        className={
          prevPage
            ? "character-slider_button-back"
            : "character-slider_button-back --inactive"
        }
        onClick={handlePreviousPage}
      >
        <SvgButton inactive={prevPage ? false : true} />
      </button>
      <ul className="character-slider_items">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </ul>
      <button
        className={
          nextPage
            ? "character-slider_button-forward"
            : "character-slider_button-forward --inactive"
        }
        onClick={handleNextPage}
      >
        <SvgButton inactive={nextPage ? false : true} />
      </button>
    </div>
  );
};
