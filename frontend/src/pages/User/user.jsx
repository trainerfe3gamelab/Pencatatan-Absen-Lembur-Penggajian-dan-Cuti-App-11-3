import React, { useEffect, useState } from 'react';
import rect146 from '../../image/Rectangle 146.png';
import rect147 from '../../image/Rectangle 147.png';
import rect148 from '../../image/Rectangle 148.png';
import rect150 from '../../image/Rectangle 150.png';
import logo from '../../image/Logo (2).png'; // Tambahkan path logo di sini
import '../../App.css'; // Import file CSS
import Profil from '../../components/Profil/Profil';
import Presensi from '../../components/Profil/Presensi/Presensi';
import Navbar from '../../components/Profil/Navbar/Navbar';
import { API_URL } from "../../helpers/networt";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const User = () => {

  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('token'); // Asumsi token disimpan di local storage

  // Mendekode token untuk mendapatkan userId
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    console.log('Decoded user ID:', userId);
  }
  


  const fetchUserProfile = async () => {
    if (!userId) {
      toast.error("Gagal memuat profil pengguna, userId tidak ditemukan!");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/employee/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data.status === "sukses") {
        setUserName(response.data.data.name);
      } else {
        toast.error("Gagal memuat profil pengguna!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      toast.error("Terjadi kesalahan saat memuat profil pengguna!");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);





  return (
    <div className="user-container">
      <div className="overlay">
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-overlay right"><span>{userName}</span></div>
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
