const express = require("express");
const cors       = require("cors")
const morgan     = require("morgan");

const app = express();

app.use(cors());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.origins(["https://chat.jsramverk.evilbengt.me:443"]);

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

server.listen(8300);
console.log("Listening on 8300");
