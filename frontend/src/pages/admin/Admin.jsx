import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import Dashboard from '../dashboard/Dashboard';
import Pengaturan from '../pengaturan/Pengaturan';
import MobileSidebar from '../../components/sidebar/mobile_sidebar';
import Pegawai from '../pegawai/pegawai';
import Jabatan from '../jabatan/jabatan';
import PotonganGaji from '../potonganGaji/potonganGaji';
import Absensi from '../absensi/absensi';
import Lembur from '../lembur/lembur';
import Cuti from '../cuti/cuti';
import RecapAbsensi from '../absensi/recapAbsensi';
import RecapGaji from '../gaji/recapGaji';
import HariLibur from '../hariLibur/HariLibur';
import WaktuAbsensi from '../waktuAbsensi/WaktuAbsensi';
import axios from "axios";
import { API_URL } from "../../helpers/networt";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const [profile, setProfile] = useState({});
  const [decodedToken, setDecodedToken] = useState("");
  const [profilePicture, setProfilePicture] = useState(false);
 

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

  const koneksiuser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        const response = await axios.get(
          `${API_URL}/api/admin/users/${decoded.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const {
          name,
          profile_picture,
        } = response.data.data;
        setProfile({
          name,
          profile_picture,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  };

  useEffect(() => {
    koneksiuser();
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
                  <p className="pt-4 nameuser">{profile.name}</p>
                  <div className="user">
                    <img className="pp" src={
                      profilePicture !== false
                        ? profilePicture
                        : profile.profile_picture
                          ? `${API_URL}/${profile.profile_picture}`
                          : profilePicture
                    } alt="Profile" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="submain">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pegawai" element={<Pegawai />} />
              <Route path="Jabatan" element={<Jabatan />} />
              <Route path="Potongan" element={<PotonganGaji />} />
              <Route path="Hari" element={<HariLibur />} />
              <Route path="Waktu" element={<WaktuAbsensi />} />
              <Route path="Absensi" element={<Absensi />} />
              <Route path="Lembur" element={<Lembur />} />
              <Route path="Cuti" element={<Cuti />} />
              <Route path="RecapAbsensi" element={<RecapAbsensi />} />
              <Route path="RecapGaji" element={<RecapGaji />} />
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
