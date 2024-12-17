import React from "react";
import { useWardrobeStore } from "../../shared/state/wardrobeStore";
import { Graph } from "react-d3-graph";

// グラフ設定
const graphConfig = {
  nodeHighlightBehavior: true,
  node: { color: "lightblue", size: 300, highlightStrokeColor: "blue", labelProperty: "label", },
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
    nodes: clothes.map((item) => ({
      id: item.id,       // 内部ID
      label: item.name,  // 表示する名前をlabelに設定
      color: "skyblue",
    })),
    links: links.map((link) => ({ source: link.source, target: link.target })),
  };

  // ノードクリック時に選択状態を更新
  const handleNodeClick = (nodeId: string) => {
    const clothingItem = clothes.find((item) => item.id === nodeId) || null;
    setSelectedClothing(clothingItem);
  };

  console.log("Graph Data:", data);
  return (
    <div className="graph-canvas">
      <Graph
        id="graph-id"
        data={data}
        config={graphConfig}
        onClickNode={handleNodeClick}
      />
      {/* 詳細表示 */}
      {selectedClothing && (
        <div
          className="details-panel"
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
          }}
        >
          <h3>選択された服の詳細</h3>
          <p>
            <strong>名前:</strong> {selectedClothing.name}
          </p>
          <p>
            <strong>カテゴリー:</strong> {selectedClothing.category}
          </p>
          <img src={selectedClothing.image} alt={selectedClothing.name} style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default GraphCanvas;
