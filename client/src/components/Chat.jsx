import { useEffect, useState } from "react";
import socket from "../socket";

function Chat({ username, room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
  console.log("Received:", data);

  if (!data.username || !data.message) {
    console.log("Invalid message received:", data);
    return;
  }

  setMessages((prev) => [...prev, data]);
});

   socket.on("showTyping", (username) => {
  setTyping(`${username} is typing...`);

  setTimeout(() => {
    setTyping("");
  }, 1000);
});

    return () => {
      socket.off("receiveMessage");
      socket.off("showTyping");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      username,
      room,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("sendMessage", msgData);

    setMessage("");
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      username,
      room,
    });
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <div className="logo">
            💬 ChatVerse
          </div>

          <div className="room-section">
            <h4>ROOMS</h4>

            <button className="room active">
              {room}
            </button>
          </div>
        </div>

        <div className="profile">
          👤 {username}
        </div>
      </div>

      {/* Main Chat */}
      <div className="chat-main">
        <div className="chat-header">
          <h2>💬 {room}</h2>
          <p>Logged in as {username}</p>
        </div>

        <div className="chat-body">
          {messages
  .filter(msg => msg && msg.username && msg.message)
  .map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.username === username
                  ? "self"
                  : "other"
              }`}
            >
              <div className="message-row">
                <div className="avatar">
  {msg.username?.charAt(0).toUpperCase() || "?"}
</div>

                <div>
                  <div className="username">
                    {msg.username}
                  </div>

                  <div className="message-content">
                    {msg.message}
                  </div>

                  <div className="time">
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="typing">
          {typing}
        </div>

        <div className="chat-footer">
          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;