import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function CreateRoom() {
  const navigate = useNavigate();

  useEffect(() => {
    const roomId = uuidv4(); // random room ID
    navigate(`/room/${roomId}`);
  }, [navigate]);

  return null; // no UI needed here
}

export default CreateRoom;
