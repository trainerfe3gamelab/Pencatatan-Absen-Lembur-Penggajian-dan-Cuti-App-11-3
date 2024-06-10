import React from 'react';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';

const Fitur = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero overlay inner-page">
        <div className="container centered-content">
          <div className="row align-items-center justify-content-center text-center pt-5">
            <div className="col-lg-6">
              <h1 className="heading text-white mb-3" data-aos="fade-up">Fitur Shift Master</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="section sec-services">
        <div className="container centered-content">
          <div className="row mb-5">
            <div className="col-lg-6 mx-auto text-center" data-aos="fade-up">
              <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>FITUR - FITUR APLIKASI SHIFTMASTER</h2>
              <p>Shift Master dilengkapi dengan berbagai fitur mutakhir yang akan terus dikembangkan sesuai dengan kebutuhan.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up">
              <div className="service text-center">
                <span className="bi-card-checklist"></span>
                <div>
                  <h3>FITUR PENCATATAN</h3>
                  <p className="mb-4">
                    Kami memudahkan proses pencatatan data karyawan dengan sistem yang terintegrasi dan mudah digunakan. Dengan fitur ini, semua informasi karyawan tersimpan secara terorganisir, memudahkan akses data kapan saja dibutuhkan, serta meminimalkan risiko kesalahan administrasi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="service text-center">
                <span className="bi-fingerprint"></span>
                <div>
                  <h3>FITUR ABSEN</h3>
                  <p className="mb-4">
                    Manajemen kehadiran kini lebih sederhana dengan fitur absen kami. Karyawan dapat mencatat kehadiran mereka dengan mudah, dan admin dapat memantau kehadiran secara real-time. Fitur ini juga dilengkapi dengan notifikasi untuk keterlambatan dan absensi tidak hadir.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="service text-center">
                <span className="bi-clipboard2-plus"></span>
                <div>
                  <h3>FITUR LEMBUR</h3>
                  <p className="mb-4">
                    Mengelola jam lembur menjadi lebih efisien dengan fitur lembur kami. Karyawan dapat mengajukan lembur dengan cepat, dan supervisor dapat menyetujui atau menolak permintaan dengan mudah. Data lembur otomatis terintegrasi dengan sistem penggajian.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="service text-center">
                <span className="bi-cash"></span>
                <div>
                  <h3>FITUR PENGGAJIAN</h3>
                  <p className="mb-4">
                    Sistem penggajian kami dirancang untuk memberikan akurasi dan efisiensi. Dengan otomatisasi perhitungan gaji, tunjangan, dan potongan, Anda dapat memastikan pembayaran yang tepat waktu dan akurat bagi karyawan Anda.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="service text-center">
                <span className="bi-calendar2-minus"></span>
                <div>
                  <h3>FITUR CUTI</h3>
                  <p className="mb-4">
                    Fitur cuti kami memudahkan pengajuan dan pengelolaan cuti karyawan. Karyawan dapat mengajukan cuti secara online, dan admin dapat memproses permintaan dengan cepat. Data cuti juga terintegrasi dengan sistem absensi untuk pemantauan yang lebih baik.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="service text-center">
                <span className="bi-shield-check"></span>
                <div>
                  <h3>INTEGRASI SISTEM</h3>
                  <p className="mb-4">
                    Semua fitur kami terintegrasi dalam satu platform yang mudah digunakan. Data dari berbagai fitur dapat diakses dan dikelola dengan efisien, memberikan Anda kontrol penuh atas manajemen sumber daya manusia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section sec-cta overlay">
        <div className="container centered-content">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="0">
              <h2 className="heading">Ingin Bicara dengan Kami?</h2>
              <p>
                Kami di sini untuk mendengarkan dan membantu Anda dengan apa pun yang Anda butuhkan.
                Apakah Anda memiliki pertanyaan, umpan balik, atau hanya ingin menyapa, tim kami
                selalu siap berinteraksi dengan Anda.
              </p>
            </div>
            <div className="col-lg-5 text-end text-center text-lg-end" data-aos="fade-up" data-aos-delay="100">
              <a onClick={() => navigate('/Contact')} className="btn btn-outline-white-reverse">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />    
    </div>
  );
}

export default Fitur;
