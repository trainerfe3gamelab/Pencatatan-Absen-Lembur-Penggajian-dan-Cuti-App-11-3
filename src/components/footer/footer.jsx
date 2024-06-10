import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer footer-dark">
      <section className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 sm-m-15px-tb md-m-30px-b">
              <h4 className="font-alt">TENTANG</h4>
              <p className="footer-text">Shift Master adalah sebuah platform pelayanan publik yang berfokus terhadap pelayanan manajemen karyawan...</p>
              <ul className="social-icons" style={{ marginTop: '10px' }}>
                <li><a className="facebook" href="#"><FaFacebook /></a></li>
                <li><a className="instagram" href="#"><FaInstagram /></a></li>
                <li><a className="twitter" href="#"><FaTwitter /></a></li>
                <li><a className="linkedin" href="#"><FaLinkedin /></a></li>
              </ul>
            </div>

            <div className="col-6 col-md-4 col-lg-2 sm-m-15px-tb">
              <h4 className="font-alt">FITUR</h4>
              <ul className="fot-link">
                <li><a href="#">Pencatatan</a></li>
                <li><a href="#">Absen</a></li>
                <li><a href="#">Lembur</a></li>
                <li><a href="#">Penggajian</a></li>
                <li><a href="#">Cuti</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-4 col-lg-2 sm-m-15px-tb">
              <h4 className="font-alt">NAVIGASI</h4>
              <ul className="fot-link">
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#">Hubungi Kami</a></li>
                <li><a href="#">Syarat Layanan</a></li>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Release Note</a></li>
              </ul>
            </div>

            <div className="col-md-4 col-lg-4 sm-m-15px-tb">
              <h4 className="font-alt">DAPATKAN INFO</h4>
              <p>Dapatkan terus informasi terbaru dari kami, silahkan berlangganan</p>
              <div className="subscribe-box m-20px-t">
                <input placeholder="Masukkan Alamat Email" className="form-control" type="text" name="demo" />
                <button className="btn btn-theme"><span className="bi-arrow-right"></span></button>
              </div>
            </div>
          </div>

          <div className="footer-copy">
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
