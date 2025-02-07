import { useDispatch, useSelector } from "react-redux";
import "./HistoryPage.css";
import { history } from "../../utils/selectors";
import { clearHistory, configureSearch, setSearchResults, setSearchError } from "../../store/searchSlice";
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constants";
import { fetchFilteredCharacters } from "../../http/characterAPI";

export const HistoryPage = () => {
  const historyList = useSelector(history);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(clearHistory());
  };

  const handleSelectHistoryItem = async (id: string) => {
    const existingHistoryItem = historyList.find(
      (historyItem) => historyItem.id === id
    );

    if (existingHistoryItem) {
      dispatch(setSearchError(""))
      dispatch(configureSearch(existingHistoryItem));
      try {
        const data = await fetchFilteredCharacters(existingHistoryItem);
        dispatch(setSearchResults(data));
      } catch (error) {
        dispatch(setSearchError(error.code));
      } finally {
        navigate(PATHS.SEARCH);
      }
    }
  };

  return (
    <div className="container history_wrapper">
      <h1 className="history_title">Search history</h1>
      {historyList.length ? (
        <>
          <ul className="history_list">
            {historyList.map((entry, index) => (
              <li
                key={index}
                onClick={() => handleSelectHistoryItem(entry.id)}
                className="history_item"
              >
                <span className="history_item-name">{entry.error ? `${entry.error}` : entry.name}</span>
                <span className="history_item-date">{entry.date}</span>
              </li>
            ))}
          </ul>
          <button onClick={handleClick} className="history_button">
            Clear history
          </button>
        </>
      ) : (
        <p className="history_message">You have no search history</p>
      )}
    </div>
  );
};
