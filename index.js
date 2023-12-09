const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.get('/', (req, res) => {
   res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    io.emit("chat message", "*User connected");

    socket.on("disconnect", () => {
        io.emit("chat message", "*User disconnected")
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server.listen(5000, () => {
   console.log('server running at http://localhost:5000');
});
