import { colors } from "@mui/material";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LANDING_URL } from "../config";


const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
const [name, setName] = useState("User");
const [email, setEmail] = useState("");
const menuRef = useRef(null);
const navigate = useNavigate();


  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  useEffect(() => {
  setName(localStorage.getItem("user_name") || "User");
  setEmail(localStorage.getItem("user_email") || "");
}, []);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const firstName = name.split(" ")[0];
const initials = name
  .split(" ")
  .map(w => w[0])
  .join("")
  .toUpperCase();

  return (
    <div className="menu-container">
      <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                <img src="logo.png" style={{ width: "30px" , height: "20px" , marginTop:"7px" }} />
              </p>
            </Link>
      
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass} >
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />

        <div className="profile" ref={menuRef} style={{marginTop:"0px"}}>
  <div className="profile-trigger" onClick={(e) =>{e.stopPropagation(); setOpen(!open);}}>
    <div className="avatar">{initials}</div>
    <p className="username">{firstName}</p>
    <span className={`arrow ${open ? "rotate" : ""}`}>▾</span>
  </div>

  {open && (
    <div className="profile-dropdown">
      <p className="name">{name}</p>
      <p className="email">{email}</p>

      <button onClick={() => window.location.href = `${LANDING_URL}/support`}>
        Support
      </button>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = `${LANDING_URL}/`;
        }}
      >
        Logout
      </button>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Menu;