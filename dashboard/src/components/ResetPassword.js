import "./Login.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // future use
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    if (!password || !confirm) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    // later backend call
    setMessage("Password reset successful");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 style={{ marginBottom: "20px" }}>Reset password</h3>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="password-input"
        />

        <button className="login-btn" onClick={handleReset}>
          Reset password
        </button>

        {message && (
          <div style={{ marginTop: "15px", fontSize: "14px" }}>
            {message}
          </div>
        )}
      </div>

      <div className="apps">
        <img src="/android.svg" alt="Android App" />
        <img src="/apple.svg" alt="iOS App" />
      </div>

      <a className="logo" href="http://localhost:3000/">
        <img src="/zerodha-logo.svg" alt="Zerodha Logo" />
      </a>

      <div className="login-footer">
        <span>Don&apos;t have an account? </span>
        <a href="http://localhost:3000/signup">Signup now!</a>
      </div>

      <div className="disclaimer">
        <p>Zerodha Broking Limited: Member of NSE, BSE, MCX ‐ SEBI Reg. no.</p>
        <p>INZ000031633 | CDSL ‐ SEBI Reg. no. IN-DP-431-2019</p>
        <br />
        <p className="version">v3.0.0</p>
      </div>
    </div>
  );
};

export default ResetPassword;
