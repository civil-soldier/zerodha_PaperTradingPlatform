import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const userId = "JVQ746"; // later from backend / localStorage
  const initials = "YK";

  const handleLogin = () => {
    // TEMP: fake login
    navigate("/" , { replace: true });
  };

  useEffect(() => {
  // Login page pe history lock
  window.history.pushState(null, "", window.location.href);

  const handleBack = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, []);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="avatar">{initials}</div>

        <div className="user-id">{userId}</div>
        <div className="change-user">Change user</div>

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

      <div style={{ marginTop: "12px", fontSize: "12px", color: "#888" }}>
  Secure login enabled. Use Logout to exit.
</div>


      <div className="apps">
        <img src="/android.svg " alt="Android App" />
        <img src="/apple.svg" alt="iOS App" />
      </div>

      <a className="logo" to="http://localhost:3000/">
        <img src="/zerodha-logo.svg" alt="Zerodha Logo" />
      </a>

      <div className="login-footer">
        <span>Don&apos;t have an account? </span>
        <a href="http://localhost:3000/signup">Signup now!</a>
      </div>

      <div className="disclaimer">
        <p>Zerodha Broking Limited: Member of <a href="https://www.nseindia.com/">NSE</a>, <a href="https://www.bseindia.com/">BSE</a>, <a href="https://www.mcxindia.com/">MCX</a> ‐ SEBI Reg. no.</p>
        <p>INZ000031633, <a href="https://www.zerodha.com/cdsl">CDSL</a> ‐ <a href="https://www.sebi.gov.in/">SEBI</a> Reg. no. IN-DP-431-2019 | <a href="https://www.zerodha.com/smart-online">Smart Online</a></p>
        <p> <a href="https://www.zerodha.com/dispute-resolution">Dispute Resolution</a> | <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?do=showScore">SEBI SCORES</a></p>
        <br></br>
        <p className="version">v3.0.0</p>
      </div>
  </div>
  );
};

export default Login;
