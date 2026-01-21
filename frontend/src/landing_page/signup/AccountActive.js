import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/api";

const AccountActive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
  const m = location.state?.mobile || localStorage.getItem("mobile");
  if (m) {
    setMobile(m);
  } else {
    navigate("/signup");
  }
}, [location.state, navigate]);

  useEffect(() => {
  if (!mobile) {
    return;
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/auth/account-active/${mobile}`);
      setName(res.data.user.name);
    } catch (err) {
      console.error("Failed to fetch account active user", err);
      navigate("/signup");
    }
  };

  fetchUser();
}, [mobile, navigate]);

  // Stable dropdown (ONLY closes on outside click)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //First name
  const firstName = name ? name.split(" ")[0] : "User";

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // Initials
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}/login`;
  };

  return (
    <div className="account-active-wrapper">
      {/* HEADER */}
      <header className="account-header">
        <img
          src="/media/images/logo.svg"
          alt="logo"
          style={{ height: "17px", marginLeft: "80px" }}
        />

        {/* USER MENU */}
        <div className="user-menu" ref={menuRef}>
          <div className="user-trigger" onClick={toggleDropdown}>
            <div className="avatar">{initials}</div>
            <span className="username">{firstName}</span>
            <span className={`arrow ${open ? "rotate" : ""}`}>▾</span>
          </div>

          {open && (
            <div className="dropdown">
              <p className="dropdown-name">{name}</p>

              <button onClick={() => navigate("/support")}>Need help?</button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="content-section">
        {/* MAIN CARD */}
        <div className="account-card">
          <div className="card-left">
            <h1>
              Your Zerodha account is active <span>🎉</span>
            </h1>

            <p className="desc">
              To get started, log in to Zerodha Kite using your User ID and
              password. You can refer to your registered email ID for more
              details.
            </p>

            <p className="welcome">Welcome aboard, and happy investing!</p>

            <button className="login-btn" onClick={handleLogin}>
              <img
                src="/media/images/logo.png"
                style={{
                  width: "20px",
                  height: "18px",
                  marginBottom: "2px",
                  marginRight: "10px",
                }}
                alt="kite"
              />
              Login to Kite
            </button>
          </div>

          <div className="card-right">
            <img src="/media/images/account_activation.svg" alt="active" />
          </div>
        </div>

        {/* VARSITY LIVE CARD */}
        <section className="varsity-section">
          <h2 className="varsity-title">New to stocks markets?</h2>
          <div className="varsity-card" style={{ marginTop: "40px" }}>
            <img
              src="/media/images/star.svg" // ⭐ small star icon
              alt="star"
              className="varsity-star"
            />
            {/* Left content */}
            <div className="varsity-left">
              <h2 className="varsity-title">Varsity live</h2>

              <p className="varsity-desc">
                Free, live, interactive financial education program. Join now!
              </p>
            </div>

            {/* Right illustration */}
            <div className="varsity-right">
              <img
                src="/media/images/vlive.svg"
                alt="varsity"
                className="varsity-illustration"
              />
            </div>
          </div>
        </section>

        {/* ZERODHA UNIVERSE */}
        <section className="universe-section">
          <h2 className="universe-title">Zerodha Universe</h2>

          <div className="universe-grid">
            {/* Card */}
            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/coin.svg"
                  alt="Coin"
                  className="universe-logo"
                  style={{ width: "70px", height: "70px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  India's largest zero-commission direct mutual funds platform.
                </p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/console.svg"
                  alt="Console"
                  className="universe-logo"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  Dashboard of your Zerodha account with insights, reports, and
                  visualizations for trades and investments.
                </p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/varsity.svg"
                  alt="Varsity"
                  className="universe-logo"
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  Free and open stock market and financial education
                </p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/tijori.svg"
                  alt="Tijori"
                  className="universe-logo"
                  style={{ width: "90px", height: "90px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  Comprehensive stock research & portfolio tracking platform.
                </p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/ditto.webp"
                  alt="Ditto"
                  className="universe-logo"
                  style={{ width: "70px", height: "30px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  Insurance made easy! Understand your policy, get answers, and
                  buy insurance—all in one place.
                </p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/sensibullLogo.svg"
                  alt="Sensibull"
                  className="universe-logo"
                  style={{ width: "120px", height: "120px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">Trade Options like a Pro</p>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-card-header">
                <img
                  src="/media/images/streak.png"
                  alt="Streak"
                  className="universe-logo"
                  style={{ width: "90px", height: "50px" }}
                />
              </div>
              <div className="universe-card-body">
                <p className="universe-desc">
                  Technical analysis tool with live scanning, insights,
                  backtesting, virtual deployment and more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccountActive;
