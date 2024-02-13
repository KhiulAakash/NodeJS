import React from 'react'
import './AdminLayout.css'
import { NavLink, Outlet } from 'react-router-dom'
import { FaMessage } from "react-icons/fa6";
import { FaRegListAlt ,FaUser,FaHome} from "react-icons/fa";

export default function AdminLayout() {
  return (
    <>
    <header>
      <div className="containter">
        <nav>
          <ul>
            <li><NavLink to='/admin/users' extra='true'><FaUser/>users</NavLink></li>
            <li><NavLink to='/admin/contacts'><FaMessage/>contacts</NavLink></li>
            <li><NavLink to='/service'><FaRegListAlt/>services</NavLink></li>
            <li><NavLink to='/'><FaHome />Home</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </>
  )
}
