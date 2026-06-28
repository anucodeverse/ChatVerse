import { useState } from "react";
import socket from "../socket";

function Join({ setUsername, setRoom, setJoined }) {
  const [name, setName] = useState("");
  const [room, setSelectedRoom] = useState("General");

  const handleJoin = () => {
    if (!name.trim()) {
      alert("Please enter your username");
      return;
    }

    socket.emit("joinRoom", {
      username: name,
      room,
    });

    setUsername(name);
    setRoom(room);
    setJoined(true);
  };

  return (
    <div className="join-container">
      <div className="join-card">

        <div className="join-logo">
          💬
        </div>

        <h1>ChatVerse</h1>

        <p className="join-subtitle">
          Real-Time Chat Application using Socket.IO
        </p>

        <div className="input-group">
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoin();
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Select Room</label>

          <select
            value={room}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="General">
              💬 General
            </option>

            <option value="Tech Support">
              🛠 Tech Support
            </option>
          </select>
        </div>

        <button onClick={handleJoin}>
          Join Chat →
        </button>

        <p className="join-footer">
          Built with React • Node.js • Express • Socket.IO
        </p>

      </div>
    </div>
  );
}

export default Join;