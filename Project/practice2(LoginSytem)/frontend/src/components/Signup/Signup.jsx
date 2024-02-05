import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const resp=await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await resp.json();
        console.log(data);
        if(data){
            navigate('/login')
        }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
