import React from 'react';
import styles from '../../pages/LandingPage/LandingPage.module.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={`${styles.footer} ${styles["footer-dark"]}`}>
      <section className={styles["footer-section"]}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-md-12 col-lg-4 sm-m-15px-tb md-m-30px-b">
              <h4 className={styles["font-alt"]}>TENTANG</h4>
              <p className={styles["footer-text"]}>Shift Master adalah sebuah platform pelayanan publik yang berfokus terhadap pelayanan manajemen karyawan...</p>
              <ul className={styles["social-icons"]} style={{ marginTop: '10px' }}>
                <li><a className={styles.facebook} href="#"><FaFacebook /></a></li>
                <li><a className={styles.instagram} href="#"><FaInstagram /></a></li>
                <li><a className={styles.twitter} href="#"><FaTwitter /></a></li>
                <li><a className={styles.linkedin} href="#"><FaLinkedin /></a></li>
              </ul>
            </div>

            <div className="col-6 col-md-4 col-lg-2 sm-m-15px-tb">
              <h4 className={styles["font-alt"]}>FITUR</h4>
              <ul className={styles["fot-link"]}>
                <li><a href="#">Pencatatan</a></li>
                <li><a href="#">Absen</a></li>
                <li><a href="#">Lembur</a></li>
                <li><a href="#">Penggajian</a></li>
                <li><a href="#">Cuti</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-4 col-lg-2 sm-m-15px-tb">
              <h4 className={styles["font-alt"]}>NAVIGASI</h4>
              <ul className={styles["fot-link"]}>
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#">Hubungi Kami</a></li>
                <li><a href="#">Syarat Layanan</a></li>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Release Note</a></li>
              </ul>
            </div>

            <div className="col-md-4 col-lg-4 sm-m-15px-tb">
              <h4 className={styles["font-alt"]}>DAPATKAN INFO</h4>
              <p>Dapatkan terus informasi terbaru dari kami, silahkan berlangganan</p>
              <div className={styles["subscribe-box"]} style={{ marginTop: '20px' }}>
                <input placeholder="Masukkan Alamat Email" className={styles["form-control"]} type="text" name="demo" />
                <button className={`${styles["btn"]} ${styles["btn-theme"]}`}><span className="bi-arrow-right"></span></button>
              </div>
            </div>
          </div>

          <div className={styles["footer-copy"]}>
            <div className="row">
              <div className="col-12">
                <p>© ShiftMaster - Aplikasi Pencatatan, Absen, Lembur, Penggajian, Cuti 2022 • Hak Cipta Dilindungi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
