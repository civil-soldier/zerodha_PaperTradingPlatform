import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import { LANDING_URL } from "../config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter your registered email");
      return;
    }

    try {
      setLoading(true);
      setMessage("Sending reset link...");

      await axios.post("/auth/forgot-password", { email });

      setMessage("If this email exists, a reset link will be sent.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 style={{ marginBottom: "20px" }}>Forgot password</h3>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="password-input"
        />

        <button
          className="login-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        {message && (
          <div
            style={{ marginTop: "15px", fontSize: "14px", color: "#FF3131" }}
          >
            {message}
          </div>
        )}

        <div
          className="forgot"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/login")}
        >
          Back to login.
        </div>
      </div>

      <div className="apps">
        <img src="/android.svg" alt="Android App" />
        <img src="/apple.svg" alt="iOS App" />
      </div>

      <a className="logo" href={`${LANDING_URL}/`}>
        <img src="/zerodha-logo.svg" alt="Zerodha Logo" />
      </a>

      <div className="login-footer">
        <span>Don&apos;t have an account? </span>
        <a href={`${LANDING_URL}/signup`}>Signup now!</a>
      </div>

      <div className="disclaimer">
        <p>Zerodha Broking Limited: Member of NSE, BSE, MCX ‐ SEBI Reg. no.</p>
        <p>INZ000031633 | CDSL ‐ SEBI Reg. no. IN-DP-431-2019</p>
        <br />
        <p className="version">v3.0.0</p>
        <p
          style={{
            marginTop: "8px",
            fontSize: "10px",
            color: "#5f6b7a",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Built by Yash Kumar
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
