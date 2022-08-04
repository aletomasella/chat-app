const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUsersInRoom, getUser } = require("./users");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 3001;

const app = express();

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    // const id = randomUUID();
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `Welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
  });

  socket.on("disconnection", () => {
    console.log("User Left");
  });
});

app.use(router);

app.get("*", (req, res) => {
  res.send("Algo salio MAL");
});

httpServer.listen(PORT, () => {
  console.log(`Listening in PORT ${PORT}`);
});
