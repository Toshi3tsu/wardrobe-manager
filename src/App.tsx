import React from "react";
import "./styles/global.css";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <HomePage />
    </div>
  );
};

export default App;
