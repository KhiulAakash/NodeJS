import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false); // Track if confirm password field is focused
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true); // Add state to track password match

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (isLogged) return navigate("/");
  }, []);

  useEffect(() => {
    if (confirmPasswordFocused) {
      setPasswordMatch(password === confirmPassword);
    }
  }, [confirmPassword, password, confirmPasswordFocused]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!passwordMatch) {
        // If passwords don't match, return without submitting
        return;
      }

      const resp = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      console.log(data);
      if (resp.ok) {
        navigate("/login");
      } else {
        setMessage(data.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <motion.div
      className="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <h3>{message}</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordFocused(true)} 
          onBlur={() => setConfirmPasswordFocused(false)} 
          required
        />
        {confirmPasswordFocused && ( 
          passwordMatch ? (
            <p id="match">Passwords match</p>
          ) : (
            <p id="notMatch">Passwords do not match</p>
          )
        )}
        <button type="submit">Signup</button>
      </form>
    </motion.div>
  );
}
