const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + '/public'));

app.get('/sse', (req, res) => {
   res.setHeader('Content-Type', 'text/event-stream');
   res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('Connection', 'keep-alive');

   // Handle client SSE connection here

   // Example: Send a welcome message
   res.write(`data: Welcome to the chat!\n\n`);
});

// WebSocket logic
wss.on('connection', (ws) => {
   ws.on('message', (message) => {
      // Broadcast the message to all connected WebSocket clients
      wss.clients.forEach((client) => {
         if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
         }
      });
   });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
