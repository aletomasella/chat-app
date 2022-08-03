const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3001;

const app = express();

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer);

io.on("connection", (socket) => {
  console.log("We have a new Connection");
  socket.on("disconnect", () => {
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
