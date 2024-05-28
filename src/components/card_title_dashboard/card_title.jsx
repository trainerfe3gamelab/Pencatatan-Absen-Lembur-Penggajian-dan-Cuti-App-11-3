import React from 'react'
import './card_title.css'
import logo from '../../image/lantop.png';

const card_title = () => {
  return (
    <div className='card-title-couter rounded-4 d-flex align-items-center p-5 rounded-4'>
        <div className='crad_counter'>
            <h1><b>ShiftMaster</b></h1>
            <p>Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti. membantu perusahaan mencapai manajemen pegawai yang cepat, efektif, dan transparan dalam era digitalisasi.</p>
        </div>
      <img src={logo} alt="" height={200} width={200} />
    </div>
  )
}

export default card_title
