import { create } from "zustand";

// ユーザが編集中のタスクをグローバル変数で管理
type EditedTask = {
  id: number;
  title: string;
};

type UseStateResult<T> = [T, React.Dispatch<React.SetStateAction<T>>];

// グローバル変数の型定義
type State = {
  editedTask: EditedTask;
  updateEditedTask: (payload: EditedTask) => void;
  resetEditedTask: () => void;
};

// グローバル変数の初期値を定義
const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: "" },
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: "" } }),
}));

export default useStore;
