import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import Dashboard from '../dashboard/Dashboard';
import Pengaturan from '../pengaturan/Pengaturan';
import MobileSidebar from '../../components/sidebar/mobile_sidebar';
import Pegawai from '../pegawai/pegawai';

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 769px)');
    const handleMediaQueryChange = (mediaQueryList) => {
      if (mediaQueryList.matches) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <div>
      {showSidebar && <MobileSidebar className='sticky-sidebar' />}
      <Sidebar isOpen={isSidebarOpen} />
      <section className={`home-section ${isSidebarOpen ? 'expanded' : ''}`}>
        <div className="home-content">
          <div className="topbar">
            <div className="topbar2">
              <div className="toggle" onClick={toggleSidebar}>
                <i className='bx bx-menu'></i>
              </div>
              <div className='wrapper'>
                <p className="admjd">Admin</p>
                <div className="wrapperuser">
                  <p className="pt-4 nameuser">Ucup</p>
                  <div className="user">
                    <img className="pp" src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="submain">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pegawai" element={<Pegawai />} />
              <Route path="pengaturan" element={<Pengaturan />} />
              <Route path="*" element={<Dashboard />} /> 
            </Routes>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
