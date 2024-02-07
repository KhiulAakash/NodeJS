import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
      const isLogged=JSON.parse(localStorage.getItem("isLogged"))
      if(isLogged){
        return navigate('/profile')
      }
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const resp=await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await resp.json()
        console.log(data)
        if(data.token){
            localStorage.setItem("user",JSON.stringify(data.user))
            localStorage.setItem("token",JSON.stringify(data.token))
            localStorage.setItem("isLogged",true);
            navigate('/profile')
        }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
