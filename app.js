const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log(`User connected to socket: ${socket.id}`)

    socket.on("joinRoom", (room) => {
        socket.join(room);
        // console.log("joined room",room);
    })
    socket.on("sendMsgToServer", (data) => {
        console.log(data)
        socket.to(data.room).emit("sendMsgToClient", data)
    })
})

server.listen(3001, () => {
    console.log(`Listning on PORT: 3001`)
})
