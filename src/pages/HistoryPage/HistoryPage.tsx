import "./HistoryPage.css"

const searchHistory = [
    { query: "Rick", date: "2024-02-01" },
    { query: "Morty", date: "2024-02-02" },
    { query: "Lorem", date: "2024-02-03" },
    { query: "Earth", date: "2024-02-04" },
  ];

export const HistoryPage = () => {
  return (
    <div className="container history_wrapper">
      <h1 className="history_title">Search history</h1>
      <ul className="history_list">
        {searchHistory.map((entry, index) => (
          <li key={index} className="history_item">
            <span className="history_item-name">{entry.query}</span>
            <span className="history_item-date">{entry.date}</span>
          </li>
        ))}
      </ul>
      <button className="history_button">
        Clear history
      </button>
    </div>
  );
}
