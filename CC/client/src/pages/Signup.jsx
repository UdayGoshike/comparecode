import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (username.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
      });

      alert("Account created successfully!");

      navigate("/"); // Redirect to Login page
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="title">CompareCode</h1>

      <p className="tagline">Compare. Analyze. Improve.</p>

      <div className="signup-box">
        <h2 style={{ color: "black" }}>Sign Up to CompareCode</h2>

        <input
          type="text"
          placeholder="Create Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Create Account
        </button>

        <p className="login-text" style={{ color: "#555" }}>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;