const http = require("http");
const ws = require("websocket").server;
const httpServer = http.createServer();
const websocket = new ws({ httpServer });
httpServer.listen(3000, () => {
   console.log("Listen");
});
const conns = [];
websocket.on("request", (req) => {
   const conn = req.accept(null, req.origin);
   conn.on("message", (mes) => {
      conns.forEach((c) => {
         if (conn.socket.remotePort == c.socket.remotePort) return;
         c.send(`User ${conn.socket.remotePort} says: ${mes.utf8Data}`);
      });
   });
   conns.forEach((c) => c.send(`User${conn.socket.remotePort} just connected`));
   conns.push(conn);
});
