import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import axios from "../../api/api";
import { useEffect } from "react";

function OtpPage({ type = "mobile" }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [hover, setHover] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const mobile = location.state?.mobile;
  const email = location.state?.email;

if (type === "mobile" && !mobile) {
    navigate("/signup");
    return null;
  }

  if (type === "email" && !mobile) {
    navigate("/signup");
    return null;
  }

  const otpComplete = otp.every((d) => d !== "");

  const handleVerifyOtp = async () => {
    try {
      let url = "";
      let payload = {};

      if (type === "mobile") {
        url = "/auth/verify-mobile-otp";
        payload = { mobile, otp: otp.join("") };
      } else {
        url = "/auth/verify-email-otp";
        payload = { mobile, otp: otp.join("") };
      }

      const res = await axios.post(url, payload);

      if (!res.data.success) return;

      //  MOBILE OTP DECISION POINT
      if (type === "mobile") {
        localStorage.setItem("signup_mobile", mobile);

        if (res.data.userType === "OLD_USER") {
          navigate(res.data.redirect);
          return;
        }

        if (
          res.data.userType === "NEW_USER" ||
          res.data.userType === "INCOMPLETE_USER"
        ) {
          if (res.data.userType === "NEW_USER") {
            navigate("/signup/email", { state: { mobile } });
            return;
          }

          if (res.data.userType === "INCOMPLETE_USER") {
            if (res.data.nextStep === 3) {
              navigate("/signup/email-otp", { state: { mobile } });
              return;
            }

            if (res.data.nextStep === 4) {
              navigate("/signup/details", { state: { mobile } });
              return;
            }

            if (res.data.nextStep === 5) {
              navigate("/signup/credentials", { state: { mobile } });
              return;
            }
          }

          return;
        }
      }

      // EMAIL OTP FLOW (UNCHANGED)
      if (type === "email") {
        localStorage.setItem("signup_email", email);
        navigate("/signup/details", { state: { mobile } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  const getBgColor = () => {
    if (!otpComplete) return "#ccc";
    if (hover) return "#1a1717ff";
    return "#387ed1";
  };

  return (
    <div
      className="container hero-section row px-5 my-5"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Demo Mode Banner */}
      <div
        style={{
          background: "#eef4ff",
          border: "1px solid #c6dbff",
          color: "#1a4fd8",
          padding: "12px 16px",
          borderRadius: "6px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <strong>Demo mode:</strong>
        <br />
        {type === "mobile" ? (
          <>
            Use <strong>OTP: 000000</strong> to continue.
          </>
        ) : (
          <>Enter the OTP sent to your email.</>
        )}
      </div>

      {/* LEFT IMAGE */}
      <div className="col-md-6 p-5 mt-4">
        <img src="/media/images/otp.svg" alt="OTP" className="img-fluid" />
      </div>

      {/* RIGHT SECTION */}
      <div className="col-md-6 p-5 mt-4">
        <h1 style={{ fontSize: "27px" }}>
          {type === "email" ? "Email OTP" : "Mobile OTP"}
        </h1>

        <p>
          Sent to <strong>{type === "email" ? email : `+91 ${mobile}`}</strong>{" "}
          <span
            style={{
              color: "#387ed1",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => {
              if (type === "email") {
                navigate("/signup/email", { state: { email } });
              } else {
                navigate("/signup", { state: { mobile } });
              }
            }}
          >
            (change)
          </span>
        </p>

        <OtpInput otp={otp} setOtp={setOtp} />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button
          disabled={!otpComplete}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleVerifyOtp}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: getBgColor(),
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: otpComplete ? "pointer" : "not-allowed",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
