import React, { useEffect, useState } from "react";
import "./Presensi.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Presensi = () => {
  const [waktuMasuk, setWaktuMasuk] = useState({});
  const [waktuKeluar, setWaktuKeluar] = useState({});
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token"); // Asumsi token disimpan di local storage

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
      const response = await axios.post(
        `${API_URL}/api/employee/attendances/in`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      toast.success(
        "Berhasil melakukan presensi masuk dengan status : " +
          response.data.data.status
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePresensiKeluar = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/employee/attendances/out`,
        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      toast.success(
        "Berhasil melakukan presensi masuk dengan status : " +
          response.data.data.status
      );
    } catch (error) {
      toast.error(error.response.data.message);
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
