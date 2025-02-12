import { useDispatch, useSelector } from "react-redux";
import "./HistoryPage.css";
import { authUserHistory } from "../../utils/selectors";
import { clearHistory } from "../../store/searchSlice";
import { AppDispatch } from "../../store/store";
import { fetchFilteredCharactersThunk } from "../../store/searchThunks";
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constants";


export const HistoryPage = () => {
  const historyList = useSelector(authUserHistory);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(clearHistory());
  };

  const handleSelectHistoryItem = (ids: string) => {
    const existingHistoryItem = historyList.find(
      (historyItem) => historyItem.id === ids
    );

    const {id, username, date, ...restData} = existingHistoryItem

    if (existingHistoryItem) {
      dispatch(fetchFilteredCharactersThunk({data: restData, isWriteToHistory: false})).finally(() => navigate(PATHS.SEARCH))
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
