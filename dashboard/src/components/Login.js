import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Username and password required");
        return;
      }

      const res = await axios.post("http://localhost:3002/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        const { token, user } = res.data;

        // Save auth token
        localStorage.setItem("token", token);
localStorage.setItem("user_id", user._id);
localStorage.setItem("user_name", user.name);
localStorage.setItem("user_email", user.email);
localStorage.setItem("user_username", user.username);


        // Go to dashboard
        navigate("/", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Avatar */}
        <div className="avatar">
          <i className="fa-solid fa-circle-user"></i>
        </div>

        {/* Title */}
        <div className="user-id">Login here!</div>

        {/* Username */}
        <input
          type="text"
          placeholder="User ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="password-input"
          style={{ marginBottom: "12px" }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div
          className="forgot"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot user ID or password?
        </div>
      </div>

      {/* Apps */}
      <div className="apps">
        <img src="/android.svg" alt="Android App" />
        <img src="/apple.svg" alt="iOS App" />
      </div>

      {/* Logo */}
      <a className="logo" href="http://localhost:3000/">
        <img src="/zerodha-logo.svg" alt="Zerodha Logo" />
      </a>

      {/* Footer */}
      <div className="login-footer">
        <span>Don&apos;t have an account? </span>
        <a href="http://localhost:3000/signup">Signup now!</a>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <p>
          Zerodha Broking Limited: Member of{" "}
          <a href="https://www.nseindia.com/">NSE</a>,{" "}
          <a href="https://www.bseindia.com/">BSE</a>,{" "}
          <a href="https://www.mcxindia.com/">MCX</a> ‐ SEBI Reg. no.
        </p>
        <p>
          INZ000031633 |{" "}
          <a href="https://www.zerodha.com/cdsl">CDSL</a> ‐{" "}
          <a href="https://www.sebi.gov.in/">SEBI</a> Reg. no. IN-DP-431-2019
        </p>
        <br />
        <p className="version">v3.0.0</p>
      </div>
    </div>
  );
};

export default Login;
