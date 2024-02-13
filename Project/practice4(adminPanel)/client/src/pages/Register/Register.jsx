import React, { useState } from "react";
import "./Register.css";
import registerImg from "../../assets/register.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import {toast} from 'react-toastify'

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(resp);
      if (resp.ok) {
        const data = await resp.json();
        console.log("Resp from server", data.token);
        storeTokenInLS(data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration successfull")
      }else{
        const data=await resp.json()
        return toast.error(data.extraDetails? data.extraDetails:data.message)
      }
      navigate("/login");
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <div className="Register">
      <main>
        <div className="image">
          <img src={registerImg} alt="Register Image" />
        </div>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <h1>Registration From</h1>
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              required
              value={user.username}
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="">Phone</label>
            <input
              type="number"
              name="phone"
              required
              value={user.phone}
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              required
              value={user.password}
              onChange={handleChange}
            />
            <div className="btn">
              <button type="submit">Register Now</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
