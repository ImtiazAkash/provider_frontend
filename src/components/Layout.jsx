import React from 'react'
import style from '../App.css'
import logo from '../assets/images/logo.png'

export default function Layout({children}) {


  return (
    <div className='layout'>
      <div className='sidebar'>
        <div className='logo'>
          <img src={logo}  />
        </div>
        <div className='sidebar-menu'>
        <div>
          <ul>
            <li>Dashboard</li>
            <li>Providers</li>
            <li>Treatments</li>
            <li>Discount</li>
            <li>Financial Reporting</li>
          </ul>
        </div>
        <div>
          <h4>Management</h4>
          <ul>
            <li>Users</li>
            <li>Qoute</li>
            <li>Appointed Schedlie</li>
            <li>Feedback & Reviews</li>
            
          </ul>
        </div>
        </div>

      </div>
      <div className='content'>
      {children}
      </div>
    </div>
  )
}
