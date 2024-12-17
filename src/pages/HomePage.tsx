import React from "react";
import GraphCanvas from "../components/shared/GraphCanvas";
import Sidebar from "../components/shared/Sidebar";
import Toolbar from "../components/shared/Toolbar";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Toolbar />
      <div className="content">
        <Sidebar />
        <GraphCanvas />
      </div>
    </div>
  );
};

export default HomePage;
