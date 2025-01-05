import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/RegisterPage.css"; 

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/users?action=register", {
        username,
        password,
      });
      alert("Registration successful! You can now log in.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed. Please try again!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
