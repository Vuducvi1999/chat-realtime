const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const path = require("path");
const {
  users,
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} = require("./users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

io.on("connect", (socket) => {
  // join
  socket.on("join", ({ name, room }) => {
    const result = addUser({ id: socket.id, name, room });
    if (!result) return;
    socket.join(room);
    socket.emit("message", {
      user: "admin",
      text: `Welcome ${name} to ${room}`,
    });
    socket.broadcast
      .to(room)
      .emit("message", { user: "admin", text: `${name} has joined!` });
    const usersInRoom = getUsersInRoom(room);
    io.to(room).emit("online", usersInRoom);
  });
  // user send message
  socket.on("sendMessage", (message) => {
    try {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
    } catch (error) {
      console.log("bug send message");
    }
  });
  // disconnect
  socket.on("disconnect", () => {
    try {
      const user = getUser(socket.id);
      const { room, name } = user;
      removeUser(socket.id);
      io.to(room).emit("online", getUsersInRoom(room));
      io.to(room).emit("message", { user: "admin", text: `${name} has left!` });
    } catch (error) {
      console.log("thao tác quá nhanh, backend xử lí chậm! Hãy thông cảm!");
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

server.listen(port, () => {
  console.log("start server");
});
