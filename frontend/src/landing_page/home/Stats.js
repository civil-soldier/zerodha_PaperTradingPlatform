import React from "react";

function Stats() {
  return (
    <div
      className="container"
      style={{ marginTop: "120px", marginBottom: "100px" }}
    >
      <div className="row">
        {/* LEFT SIDE TEXT */}
        <div className="col-6">
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 500,
              marginBottom: "40px",
            }}
          >
            Trust with confidence
          </h1>

          <h4 style={{ fontWeight: 500 }}>Customer-first always</h4>
          <p
            style={{
              color: "#666",
              fontSize: "17px",
              lineHeight: "1.6",
              marginBottom: "35px",
            }}
          >
            That's why 1.6+ crore customers trust Zerodha with ~₹6 lakh
            <p
              style={{
                color: "#666",
                fontSize: "17px",
                lineHeight: "1.6",
                marginBottom: "35px",
              }}
            >
              crores of equity investments, making us India’s largest broker;
              contributing to 15% of daily retail exchange volumes in India.
            </p>
          </p>

          <h4 style={{ fontWeight: 500 }}>No spam or gimmicks</h4>
          <p
            style={{
              color: "#666",
              fontSize: "17px",
              lineHeight: "1.6",
              marginBottom: "35px",
            }}
          >
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
            <span style={{ color: "#387ed1", cursor: "pointer" }}>
              {" "}
              Our philosophies.
            </span>
          </p>

          <h4 style={{ fontWeight: 500 }}>The Zerodha universe</h4>
          <p
            style={{
              color: "#666",
              fontSize: "17px",
              lineHeight: "1.6",
              marginBottom: "35px",
            }}
          >
            Not just an app, but a whole ecosystem. Our investments in 30+
            <p
              style={{
                color: "#666",
                fontSize: "17px",
                lineHeight: "1.6",
                marginBottom: "35px",
              }}
            >
              fintech startups offer you tailored services specific to your
              needs.
            </p>
          </p>

          <h4 style={{ fontWeight: 500 }}>Do better with money</h4>
          <p
            style={{
              color: "#666",
              fontSize: "17px",
              lineHeight: "1.6",
              marginBottom: "35px",
            }}
          >
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>

        <div className="col-6">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/media/images/ecosystem.png"
              alt="Ecosystem"
              style={{
                width: "108%",
                maxWidth: "750px",
                transform: "scale(1.1)",
                marginLeft: "-1px",
              }}
            />
          </div>

          <div className="mt-4 text-end">
            {" "}
            {/* RIGHT aligned like Zerodha */}
             <button
              type="button"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: "18px",
                marginRight: "30px",
                cursor: "pointer",
                color: "#387ed1",
              }}
            >
              Explore our products{" "}
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: "18px",
                marginRight: "90px",
                cursor: "pointer",
                color: "#387ed1",
              }}
            >
              Try Kite demo <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
