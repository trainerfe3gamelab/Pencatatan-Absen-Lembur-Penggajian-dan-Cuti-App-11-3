import React from 'react';
import logo from '../../image/lantop.png';

const CardTitle = () => {
  return (
    <div className='border border-success rounded-4 d-flex align-items-center p-5' style={{ background: 'linear-gradient(-45deg, #007991, #78FFD6)' }}>
      <div className='flex-grow-1'>
        <h1><b>ShiftMaster</b></h1>
        <p className='title_card_ds'>
          Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti. membantu perusahaan mencapai manajemen pegawai yang cepat, efektif, dan transparan dalam era digitalisasi.
        </p>
      </div>
      <div className="img-container">
        <img src={logo} alt="Logo" className="img-fluid" />
      </div>
    </div>
  );
}

export default CardTitle;
