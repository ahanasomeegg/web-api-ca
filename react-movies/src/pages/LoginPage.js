import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/users?action=login", {
                username,
                password,
            });
            const token = response.data.token;
            sessionStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            navigate("/");
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.response.data.msg || "Login failed, please try again");
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    const handleRegister = async () => {
        navigate("/register");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;