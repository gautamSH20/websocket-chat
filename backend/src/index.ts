import WebSocket, { WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 3000 });

let allSocket: WebSocket[] = [];

ws.on("connection", (socket) => {
  allSocket.push(socket);

  console.log("UserConnected #");
  const yourSocket = socket;
  socket.on("message", (message) => {
    console.log("message recived " + message.toString());

    allSocket.forEach((items) => {
      const s = items;
      s.send(message.toString() + "from user");
    });
  });
  socket.on("close", () => {
    console.log("user disconected ");
    allSocket = allSocket.filter((x) => x != socket);
    console.log(allSocket.length);
  });
});
