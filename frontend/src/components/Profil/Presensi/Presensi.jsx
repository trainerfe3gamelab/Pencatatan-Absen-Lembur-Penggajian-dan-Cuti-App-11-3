import React, { useEffect, useState } from "react";
import "./Presensi.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Presensi = () => {
 // // Waktu presensi masuk yang diizinkan (misalnya pukul 09:00 pagi)
  // const waktuPresensiMasuk = new Date();
  // waktuPresensiMasuk.setHours(12, 42, 0, 0); // 09:00:00

  // // Waktu presensi keluar yang diizinkan (misalnya pukul 17:00 sore)
  // const waktuPresensiKeluar = new Date();
  // waktuPresensiKeluar.setHours(17, 0, 0, 0); // 17:00:00



  // Mendekode token untuk mendapatkan userId
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    console.log("Decoded user ID:", userId);
  }

  const fetchUserProfile = async () => {
    if (!userId) {
      toast.error("Gagal memuat profil pengguna, userId tidak ditemukan!");
      return;
    }

    try {
      const [responseUser, responseWaktuAbsensi] = await Promise.all([
        axios.get(`${API_URL}/api/employee/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        axios.get(`${API_URL}/api/employee/attendance-times/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
      ]);
      if (responseUser.data.status === "sukses") {
        setUserName(responseUser.data.data.name);
        responseWaktuAbsensi.data.data.forEach((v) => {
          if (v.name === "waktu masuk") {
            setWaktuMasuk(v);
          } else if (v.name === "waktu keluar") {
            setWaktuKeluar(v);
          }
        });
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
    try {

      const response = await axios.post(`${API_URL}/api/employee/attendances/in`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Anda telah absen masuk tepat waktu!");
    } catch (error) {
      const message = error.response?.data?.message || "Terjadi kesalahan";
      setErrorMessage(message);
      toast.error(message);
      console.log(error);

    }
  };

  const handlePresensiKeluar = async () => {
    try {

      const response = await axios.post(`${API_URL}/api/employee/attendances/out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Anda telah absen keluar tepat waktu!");
    } catch (error) {
      const message = error.response?.data?.message || "Terjadi kesalahan";
      setErrorMessage(message);
      toast.error(message);
      console.log(error);

    }
  };


  return (
    <div className="card-presensi">
      <div className="card-body">
        <div className="card-text">
          <div>
            Selamat datang <span>{userName}</span> anda
          </div>
          <div>telah login sebagai pegawai</div>
        </div>
        <div className="card-button">
          <h6>Silahkan Presensi </h6>
          <div>
            <button className="button" onClick={handlePresensiMasuk}>
              Presensi Masuk
            </button>
          </div>
          <div>
            <button className="button" onClick={handlePresensiKeluar}>
              Presensi Keluar
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Presensi;
