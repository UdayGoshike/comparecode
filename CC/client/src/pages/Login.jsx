import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("LOGIN BUTTON CLICKED");
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
      );

      console.log("LOGIN RESPONSE");
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      console.log("TOKEN AFTER SAVE");
      console.log(localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (err) {
      console.log("FULL ERROR:", err);

      console.log("STATUS:", err.response?.status);

      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">CompareCode</h1>

      <p className="tagline">Compare. Analyze. Improve.</p>

      <div className="login-box">
        <h2>Welcome Back</h2>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
