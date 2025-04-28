import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

function VideoPlayer({ roomId }) {
  const videoRef = useRef();
  const [videoSrc, setVideoSrc] = useState(null);

  // Upload video
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  // Play Video and Emit Event
  const handlePlay = () => {
    videoRef.current.play();
    socket.emit("play_video", { roomId });
  };

  // Pause Video and Emit Event
  const handlePause = () => {
    videoRef.current.pause();
    socket.emit("pause_video", { roomId });
  };

  // Listen for Play/Pause from others
  useEffect(() => {
    socket.on("play_video", () => {
      videoRef.current.play();
    });

    socket.on("pause_video", () => {
      videoRef.current.pause();
    });

    return () => {
      socket.off("play_video");
      socket.off("pause_video");
    };
  }, []);

  // Join room when component loads
  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", { roomId });
    }
  }, [roomId]);

  return (
    <div>
      {!videoSrc ? (
        <div>
          <input type="file" accept="video/*" onChange={handleUpload} />
        </div>
      ) : (
        <div>
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            style={{ width: "80%", marginTop: "20px" }}
          />
          <div style={{ marginTop: "20px" }}>
            <button onClick={handlePlay} style={{ marginRight: "10px" }}>
              Play
            </button>
            <button onClick={handlePause}>
              Pause
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
