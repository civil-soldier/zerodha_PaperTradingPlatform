import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/api";


const EmailAuth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
const mobile = location.state?.mobile;


  const navigate = useNavigate();

  const sendEmailOtp = async () => {
  if (!mobile) {
    navigate("/signup");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "/auth/email",
      { mobile, name, email }
    );

    if (res.data.success) {
      navigate("/signup/email-otp", {
        state: { mobile, email },
      });
    }
  } catch (err) {
    setMessage(
      err.response?.data?.message || "Failed to send OTP"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container email-auth">
      <div className="row align-items-center">
        {/* LEFT IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src="/media/images/otp.svg"
            alt="email otp"
            className="img-fluid email-illustration"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-6">
          <h1 className="email-title">Enter your email</h1>

          <div className="form-group">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small>You will receive an OTP on this email address</small>
          </div>

          <button
            className="email-btn"
            onClick={sendEmailOtp}
            disabled={loading || !email || !name}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          {message && <p className="error-text">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmailAuth;
