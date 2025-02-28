import { create } from "zustand";

interface MyStore {
  auth: boolean | null;
  setAuth: () => void;
  ws: WebSocket;
  joinRoom: (data: myJoin) => void;
}

interface myJoin {
  roomId: any;
}

const web = new WebSocket("ws://localhost:3000");

export const useAuthStore = create<MyStore>((set, get) => ({
  ws: web,
  auth: null,
  setAuth: () => {
    if (get().auth === null) {
      set({ auth: false });
    }
    set({ auth: !get().auth });
  },
  joinRoom: (data: myJoin) => {
    const ws = get().ws;
    console.log("WebSocket state:", ws.readyState);

    const sendJoinMessage = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: data.roomId, // Match the interface key
          },
        })
      );
      console.log("Sent join message for room:", data.roomId);
    };

    ws.onmessage = (event) => {
      if (event.data) {
        console.log("Received from server:", event.data);
      }
    };

    if (ws.readyState === WebSocket.OPEN) {
      sendJoinMessage();
    } else {
      ws.onopen = () => {
        sendJoinMessage();
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  },
}));
