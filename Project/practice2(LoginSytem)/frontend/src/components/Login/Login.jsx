import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[message,setMessage]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (isLogged) {
      return navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("isLogged", true);
        navigate("/");
      }else{
        setMessage(data.status)
      }
    } catch (error) {
      console.log(error);
    }finally{
      setTimeout(()=>{
        setMessage(null)
      },2000)
    }
  };
  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5}}
    >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <h3>{message}</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </motion.div>
  );
}
