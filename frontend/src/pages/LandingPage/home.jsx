import React from 'react';
import styles from './LandingPage.module.css';
import hero from '../../image/hero.png';
import tentang from '../../image/tentang.png';
import keunggulan from '../../image/keunggulan.png';
import person1 from '../../image/person 1.png';
import person2 from '../../image/person 2.jpg';
import person3 from '../../image/person 3.png';
import person4 from '../../image/person 4.jpg';
import person5 from '../../image/person 5.jpeg';
import person6 from '../../image/person 6.png';
import testi1 from '../../image/img-5.jpg';
import testi2 from '../../image/img-2.jpg';
import testi3 from '../../image/img-3.jpeg';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.hero} ${styles.overlay}`}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles['align-items-center']} ${styles['justify-content-between']} ${styles['pt-5']}`}>
            <div className={`${styles['col-lg-6']} ${styles['text-center']} ${styles['text-lg-start']} ${styles['pe-lg-5']}`}>
              <h2 className={`${styles.heading} ${styles['text-white']} ${styles['mb-3']}`} data-aos="fade-up">
                Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti.
              </h2>
              <p className={`${styles['text-white']} ${styles['mb-5']}`} data-aos="fade-up" data-aos-delay="100">
                Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti, kami membawa konsep Sistem Informasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti ke tingkat berikutnya. Kami bertekad untuk membantu perusahaan mencapai manajemen pegawai yang cepat, efektif, dan transparan dalam era digitalisasi.
              </p>
              <div className={`${styles['align-items-center']} ${styles['mb-5']}`} data-aos="fade-up" data-aos-delay="200">
                <a onClick={() => navigate('/Contact')} href="#" className={`${styles.btn} ${styles['btn-outline-white-reverse']} ${styles['me-4']} ${styles['p-4']}`}>Contact us</a>
              </div>
            </div>
            <div className={`${styles['col-lg-6']}`} data-aos="fade-up" data-aos-delay="300">
              <div className={`${styles['img-wrap']} ${styles['d-flex']} ${styles['justify-content-center']}`}>
                <img src={hero} alt="Image" className={`${styles['img-fluid']} ${styles.rounded}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section} style={{ marginTop: '80px' }}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles['justify-content-between']}`}>
            <div className={`${styles['col-lg-5']} ${styles['mb-4']} ${styles['mb-lg-0']} ${styles['d-flex']} ${styles['justify-content-center']}`}>
              <img src={tentang} alt="Image" className={`${styles['img-fluid']} ${styles.rounded}`} />
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
            <a onClick={() => navigate('/Contact')} href="#" className={`${styles.btn} ${styles['btn-primary']} ${styles['p-4']}`}>HUBUNGI KAMI</a><br /><br /><br />
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


        <div className={`${styles["section"]} ${styles["sec-testimonial"]} ${styles["bg-light"]}`} style={{ paddingTop: '80px' }}>
            <div className={styles["container"]}>
                <div className={`${styles["row"]} ${styles["mb-5"]} ${styles["justify-content-center"]}`}>
                    <div className="col-lg-6 text-center">
                        <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>Testimonials</h2>
                    </div>
                </div>
                <div className={styles["testimonial-slider-wrap"]}>
                    <div className={styles["testimonial-slider"]} id="testimonial-slider">
                      <Slider {...settings}>
                        <div className="item">
                            <div className={`${styles["testimonial-half"]} ${styles["d-lg-flex"]} ${styles["bg-white"]}`}>
                            <div className={styles["img"]} style={{ backgroundImage: `url(${testi1})` }}>
                                </div>
                                <div className={styles["text"]}>
                                    <blockquote>
                                        <p>"Aplikasi ini telah menjadi game changer bagi departemen HR kami. Pencatatan kehadiran dan lembur menjadi lebih mudah diakses dan dikelola. Kami sangat menghargai fitur penggajian yang tepat waktu dan pengajuan cuti yang cepat serta transparan. Ini adalah solusi all-in-one yang wajib dimiliki setiap perusahaan!"</p>
                                    </blockquote>
                                    <div className={styles["author"]}>
                                        <strong className="d-block text-black">John Campbell</strong>
                                        <span>CEO & Co-founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className={`${styles["testimonial-half"]} ${styles["d-lg-flex"]} ${styles["bg-white"]}`}>
                            <div className="img" style={{ backgroundImage: `url(${testi2})` }}>
                                </div>
                                <div className={styles["text"]}>
                                    <blockquote>
                                        <p>"Aplikasi ini telah membuat proses administrasi kami lebih cepat dan mudah. Pencatatan kehadiran otomatis, pengelolaan lembur yang terintegrasi, dan penggajian yang akurat membuat kami dapat fokus pada hal-hal yang lebih penting. Pengajuan cuti online juga sangat efisien, menghemat waktu bagi karyawan dan manajemen."</p>
                                    </blockquote>
                                    <div className={styles["author"]}>
                                        <strong className="d-block text-black">John Campbell</strong>
                                        <span>CEO & Co-founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className={`${styles["testimonial-half"]} ${styles["d-lg-flex"]} ${styles["bg-white"]}`}>
                            <div className="img" style={{ backgroundImage: `url(${testi3})` }}>
                                </div>
                                <div className={styles["text"]}>
                                    <blockquote>
                                        <p>"Shift Master ini benar-benar telah merevolusi cara kami mengelola karyawan. Proses yang dulunya memakan waktu dan rentan kesalahan sekarang menjadi otomatis dan sangat efisien. Pengajuan cuti online yang mudah dan sistem penggajian yang akurat sangat membantu dalam meningkatkan produktivitas tim kami. Sangat direkomendasikan untuk perusahaan yang ingin mengoptimalkan manajemen sumber daya manusia mereka!"</p>
                                    </blockquote>
                                    <div className={styles["author"]}>
                                        <strong className="d-block text-black">John Campbell</strong>
                                        <span>CEO & Co-founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </Slider>
                    </div>
                </div>
            </div>
        </div>


      <Footer />
    </div>
  );
};

export default Home;
