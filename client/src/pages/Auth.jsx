import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const res = await axios.post(endpoint, { username, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // save user info
        alert(res.data.message);
        navigate("/home"); // go to Home after login/signup
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: "10px", padding: "5px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "10px", padding: "5px" }}
        />
        <br />
        <button type="submit" style={{ padding: "5px 10px" }}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: "10px" }}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
