import React, { useState } from "react";
import "./Login.css";
import LoginImg from "../../assets/register.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await resp.json();
      if (resp.ok) {
        // console.log("Resp from server", data.token);
        storeTokenInLS(data.token);
        toast.success('Login successfull')
        navigate("/");
      } else {
        return toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <main>
        <div className="image">
          <img src={LoginImg} alt="Login Image" />
        </div>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <h1>Login From</h1>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              required
              value={user.email}
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
              <button type="submit">Login Now</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
