import React from 'react';
// import './style.css';
import tentangImage from '../../image/tentang.png';
import Footer from '../../components/footer/footer';

const Tentang = () => {
  return (
    <div>
      <div className="hero overlay inner-page">
        <div className="container centered-content">
          <div className="row align-items-center justify-content-center text-center pt-5">
            <div className="col-lg-6">
              <h1 className="heading text-white mb-3" data-aos="fade-up">Tentang Shift Master</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ marginTop: '80px' }}>
        <div className="container centered-content">
          <div className="row justify-content-between">
            <div className="col-lg-5 mb-4 mb-lg-0 d-flex justify-content-center">
              <img src={tentangImage} alt="Image" className="img-fluid rounded" />
            </div>
            <div className="col-lg-6 ps-lg-2">
              <div className="mb-5">
                <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>TENTANG SHIFT MASTER</h2>
                <p style={{ textAlign: 'justify' }}>
                  Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti adalah platform inovatif yang didesain untuk memudahkan manajemen kehadiran dan penggajian pegawai di lingkungan kerja Anda. Dengan beragam fitur canggih yang kami sediakan, seperti sistem pencatatan kehadiran otomatis, manajemen lembur yang terintegrasi, penggajian yang akurat, dan kemudahan pengajuan cuti online, kami hadir untuk menyederhanakan tugas-tugas administratif Anda.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Dengan fokus pada efisiensi dan kemudahan, tujuan kami adalah mempercepat pelayanan internal perusahaan Anda dan menyediakan sarana manajemen pegawai yang efektif serta transparan. Kami mengintegrasikan berbagai fitur penting untuk membantu Anda mengelola sumber daya manusia dengan lebih baik, sehingga Anda dapat lebih fokus pada pertumbuhan bisnis Anda.
                </p>
                <a href="#" className="btn btn-primary mt-3">Lihat Selengkapnya</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Tentang;
