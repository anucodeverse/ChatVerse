import { useState } from "react";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <>
      {!joined ? (
        <Join
          setUsername={setUsername}
          setRoom={setRoom}
          setJoined={setJoined}
        />
      ) : (
        <Chat username={username} room={room} />
      )}
    </>
  );
}

export default App;