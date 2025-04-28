import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

function Room() {
  const { roomId } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Room ID: {roomId}</h2>

      <VideoPlayer roomId={roomId} />
    </div>
  );
}

export default Room;
