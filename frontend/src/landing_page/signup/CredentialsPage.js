import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const CredentialsPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const guardRan = useRef(false); //  ADD THIS

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");

    const { username, password, confirmPassword } = form;

    if (!username || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const mobile = localStorage.getItem("signup_mobile");
    if (!mobile) {
      alert("Session expired. Please signup again.");
      navigate("/signup");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/credentials",
        { mobile, username, password }
      );

      if (res.data.success) {
        localStorage.setItem("user_name", username);
        localStorage.setItem("account_activated", "true");
        navigate("/account/active", { state: { mobile } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="credentials-wrapper">
      <div className="credentials-card">
        <h1>Create login credentials</h1>
        <p className="subtitle">This will be your permanent Zerodha login ID</p>

        {error && <p className="error-text">{error}</p>}

        <input name="username" placeholder="User ID" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleChange}
        />

        <p style={{ fontSize: "12px", color: "#777", marginBottom: "10px" }}>
          Minimum 6 characters
        </p>

        <button className="primary-btn" disabled={loading} onClick={handleSubmit}>
          {loading ? "Creating..." : "Complete signup"}
        </button>
      </div>
    </div>
  );
};

export default CredentialsPage;
