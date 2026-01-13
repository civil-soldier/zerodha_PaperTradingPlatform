import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/api";


function Signup() {
  const [hover, setHover] = useState(false);
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

 const handleGetOtp = async () => {
  try {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    await axios.post("/auth/mobile", { mobile });

    navigate("/signup/otp", { state: { mobile } });
  } catch (err) {
    alert(err.response?.data?.message || "Server error");
  }
};


  return (
    <>
      {/* Main content */}
      <div
        className="container hero-section row px-5 my-5 "
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* LEFT IMAGE */}
        <div
          className="col-md-6 p-1 align-items-center mt-1"
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <img
            src="/media/images/account_open.svg"
            alt=""
            className="img-fluid"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="col-md-6 p-4">
          <div className="container mb-5">
            <div className="row d-flex flex-column">
              <h1
                className="mt-1"
                style={{ fontWeight: 500, fontSize: "27px" }}
              >
                Signup now
              </h1>

              <p
                className="mt-0.5"
                style={{
                  fontSize: "18px",
                  color: "#afafafff",
                  letterSpacing: "0.3px",
                }}
              >
                Or track your existing application
              </p>
 
              <div id="signup-phone-section" className="phone-wrapper">
                <div className="country-box">
                  <span className="flag">🇮🇳</span>
                  <span className="code">+91</span>
                </div>

                <input
                  type="tel"
                  className="phone-input"
                  placeholder="Enter your mobile number"
                  maxLength="10"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setMobile(value);
                    }
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^\d+$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              <button
                onClick={handleGetOtp}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: hover ? "#1a1717ff" : "#387ed1",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  width: "240px",
                  borderRadius: "4px",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginTop: "20px",
                  cursor: "pointer",
                  transition: "0.2s ease",
                  marginLeft: "10px",
                }}
              >
                Get OTP
              </button>

              <p
                style={{
                  fontSize: "13px",
                  color: "#868686ff",
                  marginTop: "30px",
                }}
              >
                By proceeding, you agree to the Zerodha <a href="#">terms</a> &{" "}
                <a href="#">privacy policy</a>
              </p>
              <div
                style={{
                  borderTop: "1px solid #e6e6e6",
                  marginTop: "3px",
                  marginBottom: "15px",
                }}
              ></div>
              <p style={{ fontSize: "13px", color: "#868686ff" }}>
                Looking to open NRI account? <a href="#">Click here</a>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION TITLE */}
        <div className="row p-4 mb-3 text-center mt-4">
          <div className="col-12">
            <h1 style={{ fontWeight: 500, fontSize: "25px" }}>
              Investment options with Zerodha demat account
            </h1>
          </div>
        </div>

        {/* INVESTMENT OPTIONS GRID */}
        <div className="container mb-5 " style={{ maxWidth: "1100px" }}>
          <div className="row text-center d-flex flex-column align-items-center mb-2">
            <div className="row text-center ">
              {/* STOCKS */}
              <div className="col-md-6 p-4 d-flex flex-column align-items-center">
                <img
                  src="/media/images/stocks-acop.svg"
                  alt="Stocks"
                  style={{ width: "22%" }}
                />
                <h1 style={{ fontWeight: 500, fontSize: "22px" }}>Stocks</h1>
                <p style={{ fontSize: "15px", color: "#7f7d7dff" }}>
                  Invest in all exchange-listed securities
                </p>
              </div>

              {/* MUTUAL FUNDS */}
              <div className="col-md-6 p-4 d-flex flex-column align-items-center">
                <img
                  src="/media/images/mf-acop.svg"
                  alt="Mutual Funds"
                  style={{ width: "22%" }}
                />
                <h1 style={{ fontWeight: 500, fontSize: "22px" }}>
                  Mutual funds
                </h1>
                <p style={{ fontSize: "15px", color: "#7f7d7dff" }}>
                  Invest in commission-free direct mutual funds
                </p>
              </div>

              {/* IPO */}
              <div className="col-md-6 p-4 d-flex flex-column align-items-center">
                <img
                  src="/media/images/ipo-acop.svg"
                  alt="IPO"
                  style={{ width: "22%" }}
                />
                <h1 style={{ fontWeight: 500, fontSize: "22px" }}>IPO</h1>
                <p style={{ fontSize: "15px", color: "#7f7d7dff" }}>
                  Apply to the latest IPOs instantly via UPI
                </p>
              </div>

              {/* F&O */}
              <div className="col-md-6 p-4 d-flex flex-column align-items-center">
                <img
                  src="/media/images/fo-acop.svg"
                  alt="F&O"
                  style={{ width: "22%" }}
                />
                <h1 style={{ fontWeight: 500, fontSize: "22px" }}>
                  Futures & options
                </h1>
                <p style={{ fontSize: "15px", color: "#7f7d7dff" }}>
                  Hedge and mitigate market risk through simplified F&O trading
                </p>
              </div>
            </div>

            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                backgroundColor: hover ? "#1a1717ff" : "#387ed1",
                color: "#fff",
                border: "none",
                padding: "12px",
                width: "240px",
                borderRadius: "4px",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: "20px",
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              Explore Investments
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
