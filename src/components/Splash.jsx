import React from 'react'
import logo from '../images/logo.gif'

export default function Splash({ onLoadComplete }) {
  return (
    <div className="splash-screen">
      <img 
        src={logo} 
        alt="白塔纪事工作室" 
        onLoad={onLoadComplete}
        className="splash-logo"
      />
    </div>
  )
}