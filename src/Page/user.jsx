import React from 'react';
import rect146 from '../Image/Rectangle 146.png';
import rect147 from '../Image/Rectangle 147.png';
import rect148 from '../Image/Rectangle 148.png';
import rect150 from '../Image/Rectangle 150.png';
import logo from '../Image/Logo (2).png'; // Tambahkan path logo di sini
import '../App.css'; // Import file CSS
import Profil from '../Component/Profil/Profil';
import Presensi from '../Component/Profil/Presensi/Presensi';
import Navbar from '../Component/Profil/Navbar/Navbar';


const User = () => {
  return (
    <div className="user-container">
      <div className="overlay">
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-overlay right"><span>Ahmad</span></div>
        </header>
        <Profil/>
       
          <Presensi/>
       
        <div className="content">
          <div className="card-navbar">
            <Navbar/>
          </div>
        </div>
      </div>
      <img src={rect146} alt="Rectangle 146" className="image-rect146" />
      <img src={rect147} alt="Rectangle 147" className="image-rect147" />
      <img src={rect148} alt="Rectangle 148" className="image-rect148" />
      <img src={rect150} alt="Rectangle 150" className="image-rect150" />
    </div>
  );
}

export default User;
