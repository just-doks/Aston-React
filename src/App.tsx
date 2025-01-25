import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <p>{process.env.REACT_APP_API_URL}</p>
    </div>
  );
}

export default App;
