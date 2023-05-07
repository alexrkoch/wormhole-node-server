import http from "http";
import WebSocket from "ws";

const PORT: number = process.env.NODE_ENV === 'test' 
  ? 3001 
  : (process.env.PORT ? parseInt(process.env.PORT) : 3000);

const server: http.Server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("SERVER WebSocket server is running\n");
});

const wss: WebSocket.Server = new WebSocket.Server({ server });

wss.on("connection", (socket: WebSocket) => {
  console.log("SERVER: User connected");

  socket.on("message", (message: string) => {
    socket.send(message + "-FromServer");
  });

  socket.on("close", () => {
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };