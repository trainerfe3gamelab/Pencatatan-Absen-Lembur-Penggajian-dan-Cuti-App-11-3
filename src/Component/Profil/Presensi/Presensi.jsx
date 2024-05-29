import React from 'react';
import './Presensi.css'; // Pastikan untuk mengimpor file CSS

const Presensi = () => {
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
          <button className="button">Presensi Masuk</button>
          <button className="button">Presensi Keluar</button>
        </div>
      </div>
    </div>
  );
}

export default Presensi;
