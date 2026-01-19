import React from "react";

function Footer() {
  return (
    <>
      <style>
        {`
        .footer-container {
          width: 100%;
          padding: 60px 100px;
          margin-top: 60px;
          background-color: #f9f9f9;
        }
        .footer-logo {
          width: 150px;
          margin-bottom: 15px;
        }
        .footer-heading {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .footer-link {
          color: #666 !important;
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          margin-bottom: 20px;
          display: flex;
        }
        .footer-link:hover {
          color: #387ed1 !important;
        }
        .footer-small {
          font-size: 14px;
          color: #666;
        }
        .footer-icons i {
          font-size: 20px;
          margin-right: 15px;
          color: #666;
          cursor: pointer;
        }
        .footer-icons i:hover {
          color: #387ed1;
        }
        .footer-icons hr {
          margin: 10px 0;
          border: none;
          border-top: 1px solid #ccc;
        }
        .footer-disclaimer {
          padding: 10px 2px;
          background-color: #f9f9f9;
          font-size: 11px;
          color: #878787ff;
          line-height: 1.7;
          margin-top: 0px;
        }
        .footer-disclaimer a {
          color: #387ed1 !important;
          text-decoration: none;
        }
        .footer-disclaimer a:hover {
          text-decoration: underline;
        }
        .footer-bottom-menu {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          font-weight: 500;
          font-size: 12px;
          margin-bottom: -50px;
          margin-left: 120px;
        }
        .footer-bottom-menu a {
          color: #878787ff !important;
          text-decoration: none;
        }
        .footer-bottom-menu a:hover {
          color: #387ed1 !important;
          text-decoration: none;
        }
        `}
      </style>

      <div className="container-fluid footer-container">
        <div className="row">
          {/* LEFT SIDE BLOCK */}
          <div className="col-md-3 col-sm-12 mb-5">
            <img
              src="/media/images/logo.svg"
              alt="Logo"
              className="footer-logo"
            />

            <p className="footer-small">
              © 2010 - 2025, Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>

            <div className="footer-icons">
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>

              <hr></hr>

              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>

          {/* COLUMNS */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h4 className="footer-heading">Account</h4>
            <a className="footer-link" href="">
              Open demat account
            </a>
            <a className="footer-link" href="">
              Minor demat account
            </a>
            <a className="footer-link" href="">
              NRI demat account
            </a>
            <a className="footer-link" href="">
              Commodity
            </a>
            <a className="footer-link" href="">
              Dematerialisation
            </a>
            <a className="footer-link" href="">
              Fund transfer
            </a>
            <a className="footer-link" href="">
              MTF
            </a>
            <a className="footer-link" href="">
              Referral program
            </a>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <h4 className="footer-heading">Support</h4>
            <a className="footer-link" href="">
              Contact us
            </a>
            <a className="footer-link" href="">
              Support portal
            </a>
            <a className="footer-link" href="">
              How to file a complaint?
            </a>
            <a className="footer-link" href="">
              Status of your complaints
            </a>
            <a className="footer-link" href="">
              Bulletin
            </a>
            <a className="footer-link" href="">
              Circular
            </a>
            <a className="footer-link" href="">
              Z-Connect blog
            </a>
            <a className="footer-link" href="">
              Downloads
            </a>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <h4 className="footer-heading">Company</h4>
            <a className="footer-link" href="">
              About
            </a>
            <a className="footer-link" href="">
              Philosophy
            </a>
            <a className="footer-link" href="">
              Press & media
            </a>
            <a className="footer-link" href="">
              Careers
            </a>
            <a className="footer-link" href="">
              Zerodha Cares (CSR)
            </a>
            <a className="footer-link" href="">
              Zerodha.tech
            </a>
            <a className="footer-link" href="">
              Open source
            </a>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <h4 className="footer-heading">Quick links</h4>
            <a className="footer-link" href="">
              Upcoming IPOs
            </a>
            <a className="footer-link" href="">
              Brokerage charges
            </a>
            <a className="footer-link" href="">
              Market holidays
            </a>
            <a className="footer-link" href="">
              Economic calendar
            </a>
            <a className="footer-link" href="">
              Calculators
            </a>
            <a className="footer-link" href="">
              Markets
            </a>
            <a className="footer-link" href="">
              Sectors
            </a>
          </div>

          {/* FOOTER DISCLAIMER SECTION */}
          <div className="footer-disclaimer container-fluid">
            <p>
              Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration
              no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha
              Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered
              Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony,
              Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru -
              560078, Karnataka, India. For any complaints pertaining to
              securities broking please write to{" "}
              <a href="mailto:complaints@zerodha.com">
                complaints@zerodha.com
              </a>{" "}
              , for DP related to{" "}
              <a href="mailto:dp@zerodha.com">dp@zerodha.com</a>. Please ensure
              you carefully read the Risk Disclosure Document as prescribed by
              SEBI | ICF
            </p>

            <p>
              Procedure to file a complaint on <a href="#">SEBI SCORES</a>:
              Register on SCORES portal. Mandatory details for filing complaints
              on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits:
              Effective Communication, Speedy redressal of the grievances
            </p>

            <p>
              <a href="#">Smart Online Dispute Resolution</a> |{" "}
              <a href="#">Grievances Redressal Mechanism</a>
            </p>

            <p>
              Investments in securities market are subject to market risks; read
              all the related documents carefully before investing.
            </p>

            <p>
              Attention investors: 1) Stock brokers can accept securities as
              margins from clients only by way of pledge in the depository
              system w.e.f September 01, 2020. 2) Update your e-mail and phone
              number with your stock broker / depository participant and receive
              OTP directly from depository on your e-mail and/or mobile number
              to create pledge. 3) Check your securities / MF / bonds in the
              consolidated account statement issued by NSDL/CDSL every month.
            </p>

            <p>
              India’s largest broker based on number of active clients as per
              NSE. <a href="#">NSE broker factsheet</a>
            </p>

            <p>
              “Prevent unauthorised transactions in your account. Update your
              mobile numbers/email IDs with your stock brokers. Receive
              information of your transactions directly from Exchange on your
              mobile/email at the end of the day. Issued in the interest of
              investors. KYC is one time exercise while dealing in securities
              markets - once KYC is done through a SEBI registered intermediary
              (broker, DP, Mutual Fund etc.), you need not undergo the same
              process again when you approach another intermediary.” Dear
              Investor, if you are subscribing to an IPO, there is no need to
              issue a cheque. Please write the Bank account number and sign the
              IPO application form to authorize your bank to make payment in
              case of allotment. In case of non allotment the funds will remain
              in your bank account. As a business we don't give stock tips, and
              have not authorized anyone to trade on behalf of others. If you
              find anyone claiming to be part of Zerodha and offering such
              services, please <a href="#">create a ticket here</a>.
            </p>

            <div className="footer-bottom-menu">
              <a href="#">NSE</a>
              <a href="#">BSE</a>
              <a href="#">MCX</a>
              <a href="#">Terms & conditions</a>
              <a href="#">Policies & procedures</a>
              <a href="#">Privacy policy</a>
              <a href="#">Disclosure</a>
              <a href="#">For investor's attention</a>
              <a href="#">Investor charter</a>
            </div>

            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "60px",
                paddingTop: "20px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#878787",
                  letterSpacing: "0.5px",
                }}
              >
                Built by <strong>Yash Kumar</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
