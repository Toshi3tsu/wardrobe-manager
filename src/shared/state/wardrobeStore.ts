import create from "zustand";

// 服データの型定義
type ClothingItem = {
  id: string;
  name: string;
  image: string;
  category: string;
};

type Outfit = {
  id: string;
  name: string;
  items: string[]; // 服のIDリスト
};

// 服同士のリンクの型定義
type ClothingLink = {
  source: string; // 服AのID
  target: string; // 服BのID
};

// Zustandストアの定義
interface WardrobeState {
  clothes: ClothingItem[];   // 登録されている服のリスト
  outfits: Outfit[];         // コーディネートリスト
  links: ClothingLink[];     // 服同士のリンク（関係性）
  selectedClothing: ClothingItem | null; // 選択された服
  addClothing: (item: ClothingItem) => void;   // 服を追加
  removeClothing: (id: string) => void;        // 服を削除
  addOutfit: (outfit: Outfit) => void;         // コーディネート追加
  addLink: (source: string, target: string) => void; // 服同士をリンク
  setSelectedClothing: (item: ClothingItem | null) => void;   // 服を選択
  loadFromStorage: () => void;                 // ローカルストレージから読み込み
}

export const useWardrobeStore = create<WardrobeState>((set, get) => {
  // ローカルストレージへの保存処理
  const saveToStorage = () => {
    const { clothes, outfits, links } = get();
    localStorage.setItem("clothes", JSON.stringify(clothes));
    localStorage.setItem("outfits", JSON.stringify(outfits));
    localStorage.setItem("links", JSON.stringify(links));
  };

  // ローカルストレージからデータを読み込む処理
  const loadFromStorage = () => {
    const storedClothes = localStorage.getItem("clothes");
    const storedOutfits = localStorage.getItem("outfits");
    const storedLinks = localStorage.getItem("links");
    set({
      clothes: storedClothes ? JSON.parse(storedClothes) : [],
      outfits: storedOutfits ? JSON.parse(storedOutfits) : [],
      links: storedLinks ? JSON.parse(storedLinks) : [],
    });
  };

  return {
    clothes: [],
    outfits: [],
    links: [],
    selectedClothing: null, // 初期状態はnull

    addClothing: (item) => {
      set((state) => {
        const updatedClothes = [...state.clothes, item];
        saveToStorage();
        return { clothes: updatedClothes };
      });
    },

    removeClothing: (id) => {
      set((state) => {
        const updatedClothes = state.clothes.filter((c) => c.id !== id);
        saveToStorage();
        return { clothes: updatedClothes };
      });
    },

    addOutfit: (outfit) => {
      set((state) => {
        const updatedOutfits = [...state.outfits, outfit];
        saveToStorage();
        return { outfits: updatedOutfits };
      });
    },

    addLink: (source, target) => {
      const existingClothing = get().clothes.map((item) => item.id);
      if (!existingClothing.includes(source) || !existingClothing.includes(target)) {
        console.error("リンク作成エラー: 指定されたノードIDが存在しません。");
        return;
      }
      set((state) => {
        const updatedLinks = [...state.links, { source, target }];
        saveToStorage();
        return { links: updatedLinks };
      });
    },

    setSelectedClothing: (item: ClothingItem | null) => {
      set({ selectedClothing: item });
    },    

    loadFromStorage,
  };
});
