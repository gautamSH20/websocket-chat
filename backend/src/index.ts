import WebSocket, { WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 3000 });

interface Users {
  socket: WebSocket;
  room: string;
}

let allSocket: Users[] = [];

ws.on("connection", (socket) => {
  console.log("UserConnected #");

  socket.on("message", (message) => {
    //@ts-ignore
    const parseMessage = JSON.parse(message);

    if (parseMessage.type === "join") {
      allSocket.push({
        socket,
        room: parseMessage.payload.roomId,
      });
      console.log(allSocket.length);
    }

    if (parseMessage.type === "chat") {
      const currentRoom = allSocket.find((x) => x.socket === socket)?.room;
      console.log("sent message");
      for (let i = 0; i < allSocket.length; i++) {
        if (allSocket[i].room === currentRoom) {
          allSocket[i].socket.send(parseMessage.payload.message);
        }
      }
    }
  });
  socket.on("close", () => {
    console.log("user disconnected");
    allSocket = allSocket.filter((x) => x.socket != socket);
    console.log(allSocket.length);
  });
});
