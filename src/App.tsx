import React, { useEffect } from "react";
import "./styles/global.css";
import HomePage from "./pages/HomePage";
import { useWardrobeStore } from "./shared/state/wardrobeStore"; // Zustandストアをインポート

const App: React.FC = () => {
  const { loadFromStorage } = useWardrobeStore();

  // アプリ起動時にローカルストレージからデータを読み込む
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="app-container">
      <HomePage />
    </div>
  );
};

export default App;
