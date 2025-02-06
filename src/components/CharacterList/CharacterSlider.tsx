import "./CharacterSlider.css";
import { CharacterCard } from "../CharacterCard";
import { SvgButton } from "../../assets";
import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchError, searchResults, history } from "../../utils/selectors";
import {
  setSearchResults,
  setSearchError,
  clearSearchConfig,
} from "../../store/searchSlice";
import {
  fetchCharacterPage,
  fetchFilteredCharacters,
  fetchAllCharacters,
} from "../../http/characterAPI";

export const CharacterSlider = () => {
  const dispatch = useDispatch();
  const error = useSelector(searchError);
  const response = useSelector(searchResults);
  const historyList = useSelector(history);
  const characters = response?.results || [];
  const nextPage = response?.info.next;
  const prevPage = response?.info.prev;
  useLayoutEffect(() => {
    if (error) {
      console.log('ther is an error in the store')
      throw new Error(error);
    }
    console.log('im rendering')
    const fetchIfEmpty = async () => {
      if (!characters.length && error === "" && historyList.length) {
        try {
          console.log('fetch output is empty')
          const data = await fetchFilteredCharacters(historyList[0])
          dispatch(setSearchResults(data));
        } catch (err) {
          console.log(err.code)
          if ((err.code = "ERR_BAD_REQUEST")) {
            fetchAllCharacters().then((data) => {
              dispatch(setSearchResults(data));
            });
          } else {
            throw new Error(error)
          }
        }
      }
    };
    fetchIfEmpty()
    return () => {
      dispatch(clearSearchConfig());
    };
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
          <CharacterCard character={character} key={character.id} />
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
