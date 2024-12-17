import React, { useState } from "react";
import { useWardrobeStore } from "../../shared/state/wardrobeStore";

const Sidebar: React.FC = () => {
  const { clothes, addClothing, addLink } = useWardrobeStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [linkSource, setLinkSource] = useState("");
  const [linkTarget, setLinkTarget] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // 画像アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 画像の一時プレビューURLを生成
    }
  };

  // 服の追加
  const handleAddClothing = () => {
    if (!name || !category) return;
    addClothing({
      id: Date.now().toString(),
      name,
      image: preview, // アップロードされた画像のURL
      category,
    });
    setName("");
    setCategory("");
    setImage(null);
    setPreview("");
  };

  // 服同士をリンクする
  const handleAddLink = () => {
    if (linkSource && linkTarget && linkSource !== linkTarget) {
      addLink(linkSource, linkTarget);
      setLinkSource("");
      setLinkTarget("");
    }
  };

  return (
    <aside className="sidebar">
      <h3>服の管理</h3>
      <div>
        <input
          type="text"
          placeholder="服の名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="カテゴリー"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && (
          <div>
            <p>画像プレビュー:</p>
            <img src={preview} alt="プレビュー" width="100" />
          </div>
        )}
        <button onClick={handleAddClothing}>追加</button>
      </div>
      <hr />
      <h4>服をリンク</h4>
      <select value={linkSource} onChange={(e) => setLinkSource(e.target.value)}>
        <option value="">-- 出発点を選択 --</option>
        {clothes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select value={linkTarget} onChange={(e) => setLinkTarget(e.target.value)}>
        <option value="">-- 終点を選択 --</option>
        {clothes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddLink}>リンク作成</button>
      <hr />
      <h4>登録された服</h4>
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>
            {item.image && <img src={item.image} alt={item.name} width="50" />}
            {item.name} - {item.category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
