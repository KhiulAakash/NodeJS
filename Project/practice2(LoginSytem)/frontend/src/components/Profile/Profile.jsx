import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import profile from "../../assets/user-profile-icon.png";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return navigate("/login");
    }
    try {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      setUser(userDetails);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <motion.div
      className="profile-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile">
        <h1>Profile</h1>
        <div className="img">
          <img src={profile} alt="" />
        </div>
        <label>
          Name: <span>{user.name}</span>
        </label>
        <label>
          Email: <span>{user.email}</span>
        </label>
      </div>
    </motion.div>
  );
}
