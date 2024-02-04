import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <footer>
        <p>{new Date().getFullYear()} copyright Khiul Production</p>
      </footer>
    </div>
  )
}
