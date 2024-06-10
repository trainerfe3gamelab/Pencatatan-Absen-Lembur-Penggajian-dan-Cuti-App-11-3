import React from 'react';
import styles from './LandingPage.module.css';
import tentangImage from '../../image/tentang.png';
import Footer from '../../components/footer/footer';

const Tentang = () => {
  return (
    <div>
     <div className={`${styles["hero"]} ${styles["overlay"]} ${styles["inner-page"]}`}>
        <div className={styles["container"]}>
          <div className={`${styles["row"]} ${styles["align-items-center"]} ${styles["justify-content-center"]} ${styles["text-center"]} ${styles["pt-5"]}`}>
            <div className="col-lg-6">
              <h1 className={`${styles["heading"]} ${styles["text-white"]} ${styles["mb-3"]}`} data-aos="fade-up">Tentang Shift Master</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section} style={{ marginTop: '80px' }}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles['justify-content-between']}`}>
            <div className={`${styles['col-lg-5']} ${styles['mb-4']} ${styles['mb-lg-0']} ${styles['d-flex']} ${styles['justify-content-center']}`}>
              <img src={tentangImage} alt="Image" className={`${styles['img-fluid']} ${styles.rounded}`} />
            </div>
            <div className={`${styles['col-lg-6']} ${styles['ps-lg-2']}`}>
              <div className={styles['mb-5']}>
                <h2 className={`${styles['text-black']} ${styles.h4}`} style={{ fontWeight: 'bold' }}>TENTANG SHIFT MASTER</h2>
                <p style={{ textAlign: 'justify' }}>
                  Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti adalah platform inovatif yang didesain untuk memudahkan manajemen kehadiran dan penggajian pegawai di lingkungan kerja Anda. Dengan beragam fitur canggih yang kami sediakan, seperti sistem pencatatan kehadiran otomatis, manajemen lembur yang terintegrasi, penggajian yang akurat, dan kemudahan pengajuan cuti online, kami hadir untuk menyederhanakan tugas-tugas administratif Anda.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Dengan fokus pada efisiensi dan kemudahan, tujuan kami adalah mempercepat pelayanan internal perusahaan Anda dan menyediakan sarana manajemen pegawai yang efektif serta transparan. Kami mengintegrasikan berbagai fitur penting untuk membantu Anda mengelola sumber daya manusia dengan lebih baik, sehingga Anda dapat lebih fokus pada pertumbuhan bisnis Anda.
                </p>
                <a href="#" className={`${styles.btn} ${styles['btn-primary']} ${styles['mt-3']} ${styles['p-4']}`}>Lihat Selengkapnya</a>
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
