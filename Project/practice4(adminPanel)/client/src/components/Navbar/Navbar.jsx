import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../store/auth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="Navbar">
      <header>
        <div className="logo-brand">
          <h1>
            <Link to="/">Logo</Link>
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" extra="true">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
