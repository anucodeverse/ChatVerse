const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("Socket.io server is running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your Vercel URL after testing
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join Room
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);

    socket.username = username;
    socket.room = room;

    console.log(`${username} joined ${room}`);

    // Notify others in room
    socket.to(room).emit("receiveMessage", {
      username: "System",
      message: `${username} joined the room`,
      room,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });

  // Send Message
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  // Typing
  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("showTyping", username);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");

    if (socket.username && socket.room) {
      socket.to(socket.room).emit("receiveMessage", {
        username: "System",
        message: `${socket.username} left the room`,
        room: socket.room,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});