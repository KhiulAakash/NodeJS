import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    return navigate("/login");
  };
  return (
    <div className="navbar">
      <nav>
        {token ? (
          <ul className="navMenu">
            <div><h1>Shoppy</h1></div>
            <li>
              <NavLink exact="true" to="/">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-product">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button className="logout">
                <Link to='/login' onClick={logout}>
                  Logout
                </Link>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navMenuLoginSignup">
            <div><h1>Shoppy</h1></div>
            <li>
              <button className="loginSignup">
                <Link to="/login">Login</Link>
              </button>
              <button className="loginSignup">
                <Link to="/register">Signup</Link>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
