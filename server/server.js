const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Socket.io server is running 🚀");
});

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your Vercel URL in production if needed
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join Room
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);

    socket.username = username;
    socket.room = room;

    console.log(`${username} joined room: ${room}`);

    // Notify room that user joined (optional UI enhancement)
    socket.to(room).emit("receiveMessage", {
      user: "System",
      text: `${username} joined ${room}`,
      room,
    });
  });

  // Send Message (room-based)
  socket.on("sendMessage", (data) => {
    // data = { user, text, room }
    io.to(data.room).emit("receiveMessage", data);
  });

  // Typing indicator
  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("showTyping", {
      user: username,
      message: `${username} is typing...`,
    });
  });

  // Stop typing (optional but better UX)
  socket.on("stopTyping", ({ room }) => {
    socket.to(room).emit("showTyping", null);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    const room = socket.room;
    const username = socket.username;

    if (room && username) {
      socket.to(room).emit("receiveMessage", {
        user: "System",
        text: `${username} left the chat`,
        room,
      });
    }
  });
});

// Render requires dynamic port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});