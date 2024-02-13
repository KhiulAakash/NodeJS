import React, { useState } from "react";
import "./Contact.css";
import contactImage from "../../assets/support.png";
import { useAuth } from "../../store/auth";

export default function Contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData,setUserData]=useState(true);

  const {user}=useAuth();
  if(userData && user){
    setContact({
      username:user.username,
      email:user.email,
      message:''
    })
    setUserData(false)
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      const resp=await fetch('http://localhost:5000/api/form/contact',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(contact)
      })
      const data=await resp.json()
      console.log(data)
      if(resp.ok){
        setContact({
            username: "",
            email: "",
            message: "",
        }) 
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="Contact">
      <main>
        <div className="image">
          <img src={contactImage} alt="Login Image" />
        </div>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <h1>Contact us</h1>
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              value={contact.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="">Message</label>
            <textarea
              name="message"
              value={contact.message}
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
            <div className="btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
