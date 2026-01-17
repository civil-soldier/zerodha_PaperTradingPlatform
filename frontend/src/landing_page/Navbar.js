import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* Inline Zerodha CSS */}
      <style>{`
        .zerodha-nav {
          background-color: #fafafa !important;
          border-bottom: 1px solid #e6e6e6;
          height: 68px;
          font-family: "Inter", sans-serif;
          box-shadow: 0 2px 40px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center; /* vertical center */

          position: sticky;   
          top: 0;             
          z-index: 1000;      
        }

        .zerodha-container {
          max-width: 1200px;
          display: flex;
          align-items: center;
          padding: 0 2px 0 3px;
        }

        .nav-link {
          color: #717171 !important;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          height: 68px; /* vertical centering */
        }

        .nav-link:hover {
          color: #507ec9 !important;
        }

        .navbar-brand img {
          width: 120px;
          margin-left: 38px;
          transform: translateY(0); /* perfect alignment */
        }

        .navbar-nav {
          gap: 22px;
        }

        .navbar-toggler i {
          font-size: 22px;
          color: #507ec9;
        }

        .nav-link.dropdown-toggle::after {
          display: none !important;
        }
      `}</style>

      {/* Navbar HTML */}
      <nav className="navbar navbar-expand-lg navbar-light zerodha-nav p-2">
        <div className="container-fluid zerodha-container">
          {/* Logo */}
          <Link className="navbar-brand" to={"/"}>
            <img src="media/images/logo.svg" alt="Logo" />
          </Link>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/product"}>
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/pricing"}>
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/support"}>
                  Support
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" type="button">
                      Action
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Another action
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Something else here
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
