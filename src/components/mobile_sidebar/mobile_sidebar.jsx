import React, { useState } from 'react';
import React from 'react'

const mobile_sidebar = () => {
    return (
        <div className={`mobile-menu ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <div className='mobile-menu-container'>
                <div>
                <ul className="nav-links">
        <li>
        
        <Link to="/admin/dashboard">
            <i className='bx bx-grid-alt'></i>
            <span className="link_name">Dashboard</span>
        </Link>
            
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Dashboard</a></li>
          </ul>
          
        </li>
        
        <li className={menuState.dataMaster ? 'dropmenu' : ''}>
          <div className="iocn-link">
            <a href="#">
              <i className='bx bx-collection'></i>
              <span className="link_name">Data Master</span>
            </a>
            <i
              className={`bx bxs-chevron-down arrow ${menuState.dataMaster ? 'active' : ''}`}
              onClick={() => toggleMenu('dataMaster')}
            ></i>
          </div>
          <ul className={`sub-menu ${menuState.dataMaster ? 'showMenu' : ''}`}>
            <li><a className="link_name" href="#">Data Master</a></li>
            <li>
              <div className="bg-down">
                <a href="#" className="klik-down" style={{ paddingLeft: '10px' }}>pegawai</a>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <a href="#" className="klik-down" style={{ paddingLeft: '10px' }}>jabatan</a>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <a href="#" className="klik-down" style={{ paddingLeft: '10px' }}>potongan gaji</a>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <a href="#">
          <i class='bx bxs-user-check'></i>
            <span className="link_name">Absensi</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Absensi</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
          <i class='bx bxs-dollar-circle'></i>
            <span className="link_name">Gaji</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Gaji</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
          <i class='bx bxs-briefcase-alt-2'></i>
            <span className="link_name">Lembur</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Lembur</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
          <i class='bx bxs-calendar-event'></i>
            <span className="link_name">Cuti</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">cuti</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
            <i className='bx bx-conversation'></i>
            <span className="link_name">Recap absensi</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Recap absensi</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
          <i class='bx bxs-detail'></i>
            <span className="link_name">Recap gaji</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#"></a>Recap gaji</li>
          </ul>
        </li>


        <li>
       
        <Link to="/admin/pengaturan">
            <i className='bx bx-cog'></i>
            <span className="link_name">Setting</span>
            </Link>
          <ul className="sub-menu blank">
            <li><a className="link_name" onClick={() => navigate('/admin/pengaturan')}>Setting</a></li>
          </ul>
          
        </li>
        <li>
        <a href="" onClick={() => navigate('/')}>
            <i className='bx bx-log-out'></i>
            <span className="link_name">Log Out</span>
            </a>
          <ul className="sub-menu blank">
            <li><a className="link_name logoutfilter" href="#" onClick={() => navigate('/')}>Log Out</a></li>
          </ul>
          
        </li>
      </ul>
                </div>
            </div>
        </div>
    )
}

export default mobile_sidebar
