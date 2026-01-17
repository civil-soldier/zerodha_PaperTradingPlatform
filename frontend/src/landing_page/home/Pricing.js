import React from "react";

function Pricing() {
  return (
    <div
      className="container"
      style={{ marginTop: "130px", marginBottom: "120px" }}
    >
      <div className="row">
        {/* LEFT CONTENT */}
        <div className="col-4">
          <h1
            className="mb-3"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              marginBottom: "15px",
              whiteSpace: "nowrap",
            }}
          >
            Unbeatable pricing
          </h1>

          <p style={{ fontSize: "17px", color: "#666", lineHeight: "1.6" }}>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "18px",
              color: "#387ed1",
              cursor: "pointer",
            }}
          >
            See pricing <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>

        {/* RIGHT SIDE ICONS (Perfect Zerodha layout) */}
        <div className="col-8">
          <div className="row text-center" style={{ paddingTop: "20px" }}>
            {/* BLOCK 1 */}
            <div className="col d-flex align-items-center justify-content-center">
              <img
                src="/media/images/pricing0.svg"
                alt="zero"
                style={{ width: "120px", marginRight: "-20px" }}
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "10px", margin: 0, color: "#666" }}>
                  Free account opening
                </p>
              </div>
            </div>

            {/* BLOCK 2 */}
            <div className="col d-flex align-items-center justify-content-center">
              <img
                src="/media/images/pricingMF.svg"
                alt="zero"
                style={{ width: "120px", marginRight: "-20px" }}
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "10px", margin: 0, color: "#666" }}>
                  Free equity delivery
                  <br />
                  and direct mutual funds
                </p>
              </div>
            </div>
            {/* BLOCK 3 */}
            <div className="col d-flex align-items-center justify-content-center">
              <img
                src="/media/images/pricing20.svg"
                alt="20"
                style={{ width: "120px", marginRight: "-15px" }}
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "10px", margin: "0", color: "#666" }}>
                  Intraday and F&O
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
