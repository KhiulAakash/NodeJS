import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    try {
        const userDetails=JSON.parse(localStorage.getItem("user"))
      setUser(userDetails);
      console.log(userDetails);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="profile">
      <button onClick={logout} id="logout">Logout</button>
      <h1>Profile</h1>
      <label>
        Name: <span>{user.name}</span>
      </label>
      <label>
        Email: <span>{user.email}</span>
      </label>
    </div>
  );
}
