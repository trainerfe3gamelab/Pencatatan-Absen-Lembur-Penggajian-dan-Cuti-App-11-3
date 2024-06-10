import React from 'react';
import styles from './LandingPage.module.css';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';

const Fitur = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={`${styles["hero"]} ${styles["overlay"]} ${styles["inner-page"]}`}>
        <div className={styles["container"]}>
          <div className={`${styles["row"]} ${styles["align-items-center"]} ${styles["justify-content-center"]} ${styles["text-center"]} ${styles["pt-5"]}`}>
            <div className="col-lg-6">
              <h1 className={`${styles["heading"]} ${styles["text-white"]} ${styles["mb-3"]}`} data-aos="fade-up">Fitur Shift Master</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles['sec-services']}`}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles['mb-5']}`}>
            <div className={`${styles['col-lg-6']} ${styles['mx-auto']} ${styles['text-center']}`} data-aos="fade-up">
              <h2 className={`${styles['text-black']} ${styles.h4}`} style={{ fontWeight: 'bold' }}>FITUR - FITUR APLIKASI SHIFTMASTER</h2>
              <p>Shift Master dilengkapi dengan berbagai fitur mutakhir yang akan terus dikembangkan sesuai dengan kebutuhan.</p>
            </div>
          </div>
          <div className={`${styles.row} ${styles['mobile-center']}`}>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-card-checklist"></span>
                <div>
                  <h3>FITUR PENCATATAN</h3>
                  <p className={styles['mb-4']}>
                    Kami memudahkan proses pencatatan data karyawan dengan sistem yang terintegrasi dan mudah digunakan. Dengan fitur ini, semua informasi karyawan tersimpan secara terorganisir, memudahkan akses data kapan saja dibutuhkan, serta meminimalkan risiko kesalahan administrasi.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up" data-aos-delay="100">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-fingerprint"></span>
                <div>
                  <h3>FITUR ABSEN</h3>
                  <p className={styles['mb-4']}>
                    Manajemen kehadiran kini lebih sederhana dengan fitur absen kami. Karyawan dapat mencatat kehadiran mereka dengan mudah, dan admin dapat memantau kehadiran secara real-time. Fitur ini juga dilengkapi dengan notifikasi untuk keterlambatan dan absensi tidak hadir.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up" data-aos-delay="200">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-clipboard2-plus"></span>
                <div>
                  <h3>FITUR LEMBUR</h3>
                  <p className={styles['mb-4']}>
                    Mengelola jam lembur menjadi lebih efisien dengan fitur lembur kami. Karyawan dapat mengajukan lembur dengan cepat, dan supervisor dapat menyetujui atau menolak permintaan dengan mudah. Data lembur otomatis terintegrasi dengan sistem penggajian.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up" data-aos-delay="100">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-cash"></span>
                <div>
                  <h3>FITUR PENGGAJIAN</h3>
                  <p className={styles['mb-4']}>
                    Sistem penggajian kami membantu mengotomatisasi perhitungan gaji karyawan berdasarkan data kehadiran, lembur, dan tunjangan lainnya. Proses penggajian menjadi lebih cepat, akurat, dan minim kesalahan, dengan laporan yang mudah diakses dan dipahami.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up" data-aos-delay="200">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-person-badge"></span>
                <div>
                  <h3>FITUR CUTI</h3>
                  <p className={styles['mb-4']}>
                    Fitur cuti kami memudahkan karyawan untuk mengajukan cuti secara online dan memungkinkan manajemen untuk menyetujui atau menolak permintaan cuti dengan cepat. Semua data cuti tercatat dengan rapi dan dapat diakses kapan saja untuk kebutuhan administrasi.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles['col-12']} ${styles['col-sm-6']} ${styles['col-md-6']} ${styles['col-lg-4']}`} data-aos="fade-up" data-aos-delay="300">
              <div className={`${styles.service} ${styles['text-center']}`}>
                <span className="bi-graph-up"></span>
                <div>
                  <h3>REPORT DAN ANALYTICS</h3>
                  <p className={styles['mb-4']}>
                    Kami menyediakan fitur laporan dan analitik yang membantu Anda memantau performa karyawan, penggunaan cuti, lembur, dan tren kehadiran. Data yang disajikan dalam bentuk visual yang mudah dipahami memudahkan pengambilan keputusan berbasis data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles["section"]} ${styles["sec-cta"]} ${styles["overlay"]}`}>
  <div className={`${styles["container"]} ${styles["centered-content"]}`}>
    <div className={`${styles["row"]} ${styles["justify-content-between"]} ${styles["align-items-center"]}`}>
      <div className={`${styles["col-lg-5"]}`} data-aos="fade-up" data-aos-delay="0">
        <h2 className={styles["heading"]}>Ingin Bicara dengan Kami?</h2>
        <p>
          Kami di sini untuk mendengarkan dan membantu Anda dengan apa pun yang Anda butuhkan.
          Apakah Anda memiliki pertanyaan, umpan balik, atau hanya ingin menyapa, tim kami
          selalu siap berinteraksi dengan Anda.
        </p>
      </div>
      <div className={`${styles["col-lg-5"]} ${styles["text-end"]} ${styles["text-center"]} ${styles["text-lg-end"]}`} data-aos="fade-up" data-aos-delay="100">
        <a onClick={() => navigate('/Contact')} className={`${styles["btn"]} ${styles["btn-outline-white-reverse"]}`}>
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
