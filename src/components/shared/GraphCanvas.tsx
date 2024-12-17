import React from "react";
import { useWardrobeStore } from "../../shared/state/wardrobeStore";
import { Graph } from "react-d3-graph";

// グラフ設定
const graphConfig = {
  nodeHighlightBehavior: true,
  node: { color: "lightblue", size: 300, highlightStrokeColor: "blue" },
  link: { highlightColor: "lightblue" },
  directed: false,
  height: 600,
  width: 800,
};

const GraphCanvas: React.FC = () => {
  const { clothes, links, setSelectedClothing, selectedClothing } =
    useWardrobeStore();

  // ノードとリンクデータの生成
  const data = {
    nodes: clothes.map((item) => ({ id: item.id, name: item.name, color: "skyblue" })),
    links: links.map((link) => ({ source: link.source, target: link.target })),
  };

  // ノードクリック時に選択状態を更新
  const handleNodeClick = (nodeId: string) => {
    setSelectedClothing(nodeId);
  };

  return (
    <div className="graph-canvas">
      <h2>服の関係性グラフ</h2>
      <Graph
        id="graph-id"
        data={data}
        config={graphConfig}
        onClickNode={handleNodeClick}
      />
      {/* 詳細表示 */}
      {selectedClothing && (
        <div className="details-panel" style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h3>選択された服の詳細</h3>
          <p><strong>名前:</strong> {selectedClothing.name}</p>
          <p><strong>カテゴリー:</strong> {selectedClothing.category}</p>
        </div>
      )}
    </div>
  );
};

export default GraphCanvas;
