import { create } from "zustand";

interface MyStore {
  auth: boolean;
  setAuth: () => void;
  ws: WebSocket | null;
}

const web = new WebSocket("ws://localhost:3000");

export const useAuthStore = create<MyStore>((set, get) => ({
  ws: web,
  auth: false,
  setAuth: () => {
    set({ auth: !get().auth });
  },
}));
