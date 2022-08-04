const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUsersInRoom, getUser } = require("./users");
const { randomUUID } = require("crypto");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN || "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

app.use(cors());

app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(error, user);
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
    } else {
      callback({ error: "Need to login again" });
    }

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("*", (req, res) => {
  res.send("Algo salio MAL");
});

httpServer.listen(PORT, () => {
  console.log(`Listening in PORT ${PORT}`);
});
