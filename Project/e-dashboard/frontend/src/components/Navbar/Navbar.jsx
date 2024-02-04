import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="navbar">
      <nav>
        {auth ? (
          <ul className="navMenu">
            <li><h1>Logo</h1></li>
            <li>
              <NavLink exact="true" to="/">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/add">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button className="logout">
                <Link to="/signup" onClick={logout}>
                  Logout ({JSON.parse(auth).name})
                </Link>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navMenuLoginSignup">
            <li><h1>Logo</h1></li>
            <li>
              <button className="loginSignup">
                <Link to="/login">Login</Link>
              </button>
              <button className="loginSignup">
                <Link to="/signup">Signup</Link>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
