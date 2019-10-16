const express = require("express");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", function (socket) {
    socket.on("messageFromClient", function (message) {
        console.log("messageFromClient:");
        console.log("> " + message);

        io.emit("messageFromServer", message);
    });
    socket.on("clientConnected", function (message) {
        console.log("clientConnected:");
        console.log("> " + message);

        io.emit("newClient", message);
    })
});

server.listen(3001);
console.log("Listening on 3001");
