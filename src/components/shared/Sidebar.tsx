import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h3>服の管理</h3>
      <button>新しい服を追加</button>
      {/* 服の一覧やフィルタリング機能を追加 */}
    </aside>
  );
};

export default Sidebar;
