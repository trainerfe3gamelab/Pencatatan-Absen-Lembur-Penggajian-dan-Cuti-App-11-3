import React from 'react'
import styles from './LandingPage.module.css';
import Footer from '../../components/footer/footer';

const contact = () => {
  return (
    <div>
  <div className={`${styles["hero"]} ${styles["overlay"]} ${styles["inner-page"]}`}>
    <div className={styles["container"]}>
      <div className={`${styles["row"]} ${styles["align-items-center"]} ${styles["justify-content-center"]} ${styles["text-center"]} ${styles["pt-5"]}`}>
        <div className="col-lg-6">
          <h1 className={`${styles["heading"]} ${styles["text-white"]} ${styles["mb-3"]}`} data-aos="fade-up">Hubungi Kami</h1>
          <p>Segala jenis pertanyaan seputar Layanan Shift Master akan kami jawab dengan
					penuh senang hati</p>
        </div>
      </div>
    </div>
  </div>

  <div className={styles["section"]}>
    <div className={styles["container"]}>
      <div className={styles["row"]}>
        <div className={`${styles["col-lg-4"]} ${styles["mb-5"]} ${styles["mb-lg-0"]}`} data-aos="fade-up" data-aos-delay="100">
          <div className={styles["contact-info"]}>
            <div className={`${styles["address"]} ${styles["mt-2"]}`}>
              <i className={`${styles["bi"]} ${styles["bi-geo-alt"]}`}></i>
              <h4 className={`${styles["mb-2"]}`}>Location:</h4>
              <p>Perum. Griya Palem Indah B-17 <br /> Jember Jawa Timur 61419</p>
            </div>
            <div className={`${styles["email"]} ${styles["mt-4"]}`}>
              <i className={`${styles["bi"]} ${styles["bi-envelope"]}`}></i>
              <h4 className={`${styles["mb-2"]}`}>Email:</h4>
              <p>ShiftMaster@gmail.com</p>
            </div>
            <div className={`${styles["phone"]} ${styles["mt-4"]}`}>
              <i className={`${styles["bi"]} ${styles["bi-whatsapp"]}`}></i>
              <h4 className={`${styles["mb-2"]}`}>No. Telp/WA</h4>
              <p>+62 823-3089-1112</p>
            </div>
          </div>
        </div>
        <div className={`${styles["col-lg-8"]}`} data-aos="fade-up" data-aos-delay="200">
          <form action="#">
            <div className={styles["row"]}>
              <div className={`${styles["col-6"]} ${styles["mb-3"]}`}>
                <input type="text" className={styles["form-control"]} placeholder="Nama Lengkap" />
              </div>
              <div className={`${styles["col-6"]} ${styles["mb-3"]}`}>
                <input type="email" className={styles["form-control"]} placeholder="Alamat Email" />
              </div>
              <div className={`${styles["col-12"]} ${styles["mb-3"]}`}>
                <input type="text" className={styles["form-control"]} placeholder="No. Telp/WA" />
              </div>
              <div className={`${styles["col-12"]} ${styles["mb-3"]}`}>
                <textarea cols="30" rows="7" className={styles["form-control"]} placeholder="Tulis Pesan Anda"></textarea>
              </div>
              <div className={`${styles["col-12"]}`}>
                <input type="submit" value="Kirim Pesan" className={`${styles["btn"]} ${styles["btn-primary"]}`} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>



      
      <Footer />    
    </div>
  )
}

export default contact
