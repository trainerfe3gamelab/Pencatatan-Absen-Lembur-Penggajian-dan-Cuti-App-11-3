import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './admin.css';
import Sidebar from '../../components/sidebar/sidebar';
import Dashboard from '../dashboard/Dashboard';
import Pengaturan from '../pengaturan/Pengaturan';

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mengubah default menjadi false

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} /> {/* Melewatkan status isSidebarOpen ke Sidebar */}
      <section className={`home-section ${isSidebarOpen ? 'expanded' : ''}`}> {/* Mengubah kelas berdasarkan isSidebarOpen */}
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
