import React from 'react'
import styles from './LandingPage.module.css';
import Footer from '../../components/footer/footer';
import keunggulan from '../../image/keunggulan.png';
import person1 from '../../image/person 1.png';
import person2 from '../../image/person 2.jpg';
import person3 from '../../image/person 3.png';
import person4 from '../../image/person 4.jpg';
import person5 from '../../image/person 5.jpeg';
import person6 from '../../image/person 6.png';

const benefit = () => {
  return (
    <div>
       <div className={`${styles["hero"]} ${styles["overlay"]} ${styles["inner-page"]}`}>
        <div className={styles["container"]}>
          <div className={`${styles["row"]} ${styles["align-items-center"]} ${styles["justify-content-center"]} ${styles["text-center"]} ${styles["pt-5"]}`}>
            <div className="col-lg-6">
              <h1 className={`${styles["heading"]} ${styles["text-white"]} ${styles["mb-3"]}`} data-aos="fade-up">Benefit dari Shift Master</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section} style={{ marginTop: '50px' }}>
      <div className={styles.container}>
        <div className={`${styles.row} ${styles['justify-content-between']}`}>
          <div className={`${styles['col-lg-5']} ${styles['mb-4']} ${styles['mb-lg-0']} ${styles['d-flex']} ${styles['justify-content-center']}`}>
            <img src={keunggulan} alt="Keunggulan" className={`${styles['img-fluid']} ${styles.rounded}`} />
            <span className="bi bi-check-lg" style={{ fontSize: '3rem', fontWeight: 'bold', color: 'black' }}>
            </span>
          </div>
          <div className={`${styles['col-lg-6']} ${styles['ps-lg-2']}`}>
            <div className={styles['mb-5']}>
              <h2 className={`${styles['text-black']} ${styles.h4}`} style={{ fontWeight: 'bold' }}>Keunggulan</h2>
              <p style={{ textAlign: 'justify' }}>Alasan kenapa desa Anda harus menggunakan Shift Master segera.</p>
              <p style={{ textAlign: 'justify' }}>
                - Fitur Tepat Guna<br />
                ShiftMaster anti terhadap fitur yang ribet dan tidak berguna, system dan layanan yang ditawarkan ShiftMaster dijamin akan mengerti kemauan Anda.
              </p>
              <p style={{ textAlign: 'justify' }}>
                - Dukungan Teknologi Terbaru<br />
                ShiftMaster menggunakan teknologi mutakhir dalam pembangunannya, ditunjang dengan security / keamanan yang memadai dan modul-modul populer.
              </p>
              <p style={{ textAlign: 'justify' }}>
                - Dukungan Tim Professional Muda Berpengalaman<br />
                ShiftMaster memiliki SDM yang kompeten, muda dan kreatif dalam mengembangkan produk digital.
              </p>
              <p style={{ textAlign: 'justify' }}>
                - Konsultasi Gratis<br />
                ShiftMaster menyediakan berbagai fasilitas untuk mitra agar dapat senantiasa berkonsultasi terkait layanan yang ada. Sidedi menjamin konsultasi gratis yang akan ditangani langsung oleh tim professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className={`${styles["section"]} ${styles["counter"]} ${styles["theme-bg"]}`}>
    <div className={styles["container"]}>
        <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
                <div className={styles["counter-col"]}>
                    <div className={styles["counter-data"]}>
                        <div className={`${styles["count"]} ${styles["theme-color"]} ${styles["font-alt"]}`} data-to="400" data-speed="400">50+</div>
                        <h6>WEBSITE PENCATATAN</h6>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
                <div className={styles["counter-col"]}>
                    <div className={styles["counter-data"]}>
                        <div className={`${styles["count"]} ${styles["theme-color"]} ${styles["font-alt"]}`} data-to="15" data-speed="15">15</div>
                        <h6>Experience</h6>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
                <div className={styles["counter-col"]}>
                    <div className={styles["counter-data"]}>
                        <div className={`${styles["count"]} ${styles["theme-color"]} ${styles["font-alt"]}`} data-to="650" data-speed="650">650</div>
                        <h6>Resource</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


        <section className={styles.section} style={{ paddingTop: '120px' }}>
  <div className={`${styles.container} ${styles['centered-content']}`}>
    <div className={styles.row}>
      <div className={`${styles['col-lg-4']} ${styles['md-m-30px-b']}`}>
        <div className={styles['section-title-02']}>
          <h2 className={`${styles['text-black']} ${styles.h4} ${styles['fot-link']}`} style={{ fontWeight: 'bold' }}>TEAM KAMI</h2><br />
          <p>Selangkah lebih dekat dengan tim Shift Master.</p><br />
          <div className={styles['btn-bar']}>
            <a href="#" className={`${styles.btn} ${styles['btn-primary']} ${styles['p-4']}`}>HUBUNGI KAMI</a><br /><br /><br />
          </div>
        </div>
      </div>
      <div className={styles['col-lg-8']}>
        <div className={styles.row}>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person1} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Muhamad Fais Aizat</h6>
                <p>Front-End Software Engineer</p><br /><br />
              </div>
            </div>
          </div>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person2} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Muhammad Heriyanto</h6>
                <p>Front-End Software Engineer</p><br /><br />
              </div>
            </div>
          </div>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person3} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Dinda Nausa Kusuma</h6>
                <p>Front-End Software Engineer</p><br /><br />
              </div>
            </div>
          </div>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person4} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Bachtiar Alif Darmawan</h6>
                <p>Back-End Software Engineer</p>
              </div>
            </div>
          </div>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person5} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Gelorawan Susatyo J</h6>
                <p>Back-End Software Engineer</p>
              </div>
            </div>
          </div>
          <div className={`${styles['col-md-4']} ${styles['col-sm-6']} ${styles['m-30px-b']}`}>
            <div className={styles['our-team-01']}>
              <div className={`${styles['team-img']} ${styles['theme-after']}`}>
                <div className={styles.img}>
                  <img src={person6} title="" alt="" />
                </div>
              </div>
              <div className={styles['team-info']}>
                <h6 className={styles['theme-color']}>Abdur Rohim</h6>
                <p>Back-End Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    <Footer />    
    </div>
  )
}

export default benefit
