import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim() !== "") {
      navigate(`/room/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={handleJoin} style={{ padding: "5px 15px", marginTop: "10px" }}>
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
