import React, { useEffect, useState } from 'react';
import './Presensi.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Presensi = () => {
  // Waktu presensi masuk yang diizinkan (misalnya pukul 09:00 pagi)
  const waktuPresensiMasuk = new Date();
  waktuPresensiMasuk.setHours(12, 42, 0, 0); // 09:00:00

  // Waktu presensi keluar yang diizinkan (misalnya pukul 17:00 sore)
  const waktuPresensiKeluar = new Date();
  waktuPresensiKeluar.setHours(17, 0, 0, 0); // 17:00:00

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

  const handlePresensiMasuk = async () => {
    const sekarang = new Date();

    if (sekarang <= waktuPresensiMasuk) {
      try {
        const response = await axios.post(`${API_URL}/employee/attendances/in`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        
        if (response.data.status === "sukses") {
          toast.success("Anda telah absen masuk tepat waktu!");
        } else {
          toast.error("Gagal melakukan presensi masuk!");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat melakukan presensi masuk!");
      }
    } else {
      toast.error("Anda terlambat absen masuk!");
    }
  };

  const handlePresensiKeluar = async () => {
    const sekarang = new Date();

    if (sekarang >= waktuPresensiKeluar) {
      try {
        const response = await axios.post(`${API_URL}/employee/attendances/out`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        
        if (response.data.status === "sukses") {
          toast.success("Anda telah absen keluar tepat waktu!");
        } else {
          toast.error("Gagal melakukan presensi keluar!");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat melakukan presensi keluar!");
      }
    } else {
      toast.error("Anda terlalu cepat absen keluar!");
    }
  };

  return (
    <div className="card-presensi">
      <div className="card-body">
        <div className="card-text">
          <div>
            Selamat datang <span>{userName}</span> anda
          </div>
          <div>
            telah login sebagai pegawai
          </div>
        </div>
        <div className='card-button'>
          <h6>Silahkan Presensi </h6>
          <button className="button" onClick={handlePresensiMasuk}>Presensi Masuk</button>
          <button className="button" onClick={handlePresensiKeluar}>Presensi Keluar</button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Presensi;
