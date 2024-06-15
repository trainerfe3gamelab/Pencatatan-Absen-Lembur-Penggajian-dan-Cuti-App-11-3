import React from 'react';
import './Presensi.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../helpers/networt";
import axios from "axios";

const Presensi = () => {
  // Waktu presensi masuk yang diizinkan (misalnya pukul 09:00 pagi)
  const waktuPresensiMasuk = new Date();
  waktuPresensiMasuk.setHours(12, 42, 0, 0); // 09:00:00

  // Waktu presensi keluar yang diizinkan (misalnya pukul 17:00 sore)
  const waktuPresensiKeluar = new Date();
  waktuPresensiKeluar.setHours(17, 0, 0, 0); // 17:00:00

  const handlePresensiMasuk = () => {
    const sekarang = new Date();

    if (sekarang <= waktuPresensiMasuk) {
      toast.success("Anda telah absen masuk tepat waktu!");
    } else {
      toast.error("Anda terlambat absen masuk!");
    }
  };

  const handlePresensiKeluar = () => {
    const sekarang = new Date();

    if (sekarang >= waktuPresensiKeluar) {
      toast.success("Anda telah absen keluar tepat waktu!");
    } else {
      toast.error("Anda terlalu cepat absen keluar!");
    }
  };

  return (
    <div className="card-presensi">
      <div className="card-body">
        <div className="card-text">
          <div>
            Selamat datang <span>ahmad</span> anda
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
