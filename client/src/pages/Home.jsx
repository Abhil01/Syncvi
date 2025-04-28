import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {JSON.parse(localStorage.getItem("user"))?.username}</h1>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/create-room")} style={{ marginRight: "20px", padding: "10px 20px" }}>
          Create Room
        </button>

        <button onClick={() => navigate("/join-room")} style={{ padding: "10px 20px" }}>
          Join Room
        </button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <button onClick={logout} style={{ backgroundColor: "red", color: "white", padding: "8px 15px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
