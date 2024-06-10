import React from 'react';
import './style.css'
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
    <div className="body">
       <div className="hero overlay">
        <div className="container centered-content">
          <div className="row align-items-center justify-content-between pt-5">
            <div className="col-lg-6 text-center text-lg-start pe-lg-5">
              <h2 className="heading text-white mb-3" data-aos="fade-up">
                Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti.
              </h2>
              <p className="text-white mb-5" data-aos="fade-up" data-aos-delay="100">
                Aplikasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti, kami membawa konsep Sistem Informasi Pencatatan, Absen, Lembur, Penggajian, dan Cuti ke tingkat berikutnya. Kami bertekad untuk membantu perusahaan mencapai manajemen pegawai yang cepat, efektif, dan transparan dalam era digitalisasi.
              </p>
              <div className="align-items-center mb-5" data-aos="fade-up" data-aos-delay="200">
                <a  onClick={() => navigate('/Contact')} href="#" className="btn btn-outline-white-reverse me-4">Contact us</a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div className="img-wrap d-flex justify-content-center">
                <img src={hero} alt="Image" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ marginTop: '80px' }}>
        <div className="container centered-content">
          <div className="row justify-content-between">
            <div className="col-lg-5 mb-4 mb-lg-0 d-flex justify-content-center">
              <img src={tentang} alt="Image" className="img-fluid rounded" />
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

  <div className="section sec-services" >
  <div className="container centered-content">
    <div className="row mb-5">
      <div className="col-lg-6 mx-auto text-center" data-aos="fade-up">
        <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>FITUR - FITUR APLIKASI SHIFTMASTER</h2>
        <p>Shift Master dilengkapi dengan berbagai fitur mutakhir yang akan terus dikembangkan sesuai dengan kebutuhan.</p>
      </div>
    </div>
    <div className="row mobile-center">
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


      <div className="section" style={{ marginTop: '50px' }}>
      <div className="container centered-content">
        <div className="row justify-content-between">
          <div className="col-lg-5 mb-4 mb-lg-0 d-flex justify-content-center">
            <img src={keunggulan} alt="Image" className="img-fluid rounded" />
            <span className="bi bi-check-lg" style={{ fontSize: '3rem', fontWeight: 'bold', color: 'black' }}></span>
          </div>
          <div className="col-lg-6 ps-lg-2">
            <div className="mb-5">
              <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>Keunggulan</h2><br />
              <p c>Alasan kenapa Anda harus menggunakan Shift Master segera.</p>
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

    <section className="section counter theme-bg">
      <div className="container centered-content">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
            <div className="counter-col">
              <div className="counter-data">
                <div className="count theme-color font-alt" data-to="400" data-speed="400">50+</div>
                <h6>WEBSITE PENCATATAN</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
            <div className="counter-col">
              <div className="counter-data">
                <div className="count theme-color font-alt" data-to="15" data-speed="15">15</div>
                <h6>Experience</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-4 m-15px-tb">
            <div className="counter-col">
              <div className="counter-data">
                <div className="count theme-color font-alt" data-to="650" data-speed="650">650</div>
                <h6>Resource</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container centered-content">
        <div className="row">
          <div className="col-lg-4 md-m-30px-b">
            <div className="section-title-02">
              <h2 className="text-black h4 fot-link" style={{ fontWeight: 'bold' }}>TEAM KAMI</h2><br />
              <p>Selangkah lebih dekat dengan tim Shift Master.</p><br />
              <div className="btn-bar">
                <a onClick={() => navigate('/Contact')} href="#"className="btn btn-primary">HUBUNGI KAMI</a><br /><br /><br />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person1} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Muhamad Fais Aizat</h6>
                    <p>Front-End Software Engineer</p><br /><br />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person2} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Muhammad Heriyanto</h6>
                    <p>Front-End Software Engineer</p><br /><br />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person3} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Dinda Nausa Kusuma</h6>
                    <p>Front-End Software Engineer</p><br /><br />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person4} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Bachtiar Alif Darmawan</h6>
                    <p>Back-End Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person5} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Gelorawan Susatyo J</h6>
                    <p>Back-End Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 m-30px-b">
                <div className="our-team-01">
                  <div className="team-img theme-after">
                    <div className="img">
                      <img src={person6} title="" alt="" />
                    </div>
                  </div>
                  <div className="team-info">
                    <h6 className="theme-color">Abdur Rohim </h6>
                    <p>Back-End Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="section sec-testimonial bg-light" style={{ paddingTop: '80px' }}>
            <div className="container">
                <div className="row mb-5 justify-content-center">
                    <div className="col-lg-6 text-center">
                        <h2 className="text-black h4" style={{ fontWeight: 'bold' }}>Testimonials</h2>
                    </div>
                </div>
                <div className="testimonial-slider-wrap">
                    <div className="testimonial-slider" id="testimonial-slider">
                      <Slider {...settings}>
                        <div className="item">
                            <div className="testimonial-half d-lg-flex bg-white">
                            <div className="img" style={{ backgroundImage: `url(${testi1})` }}>
                                </div>
                                <div className="text">
                                    <blockquote>
                                        <p>"Aplikasi ini telah menjadi game changer bagi departemen HR kami. Pencatatan kehadiran dan lembur menjadi lebih mudah diakses dan dikelola. Kami sangat menghargai fitur penggajian yang tepat waktu dan pengajuan cuti yang cepat serta transparan. Ini adalah solusi all-in-one yang wajib dimiliki setiap perusahaan!"</p>
                                    </blockquote>
                                    <div className="author">
                                        <strong className="d-block text-black">John Campbell</strong>
                                        <span>CEO & Co-founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="testimonial-half d-lg-flex bg-white">
                            <div className="img" style={{ backgroundImage: `url(${testi2})` }}>
                                </div>
                                <div className="text">
                                    <blockquote>
                                        <p>"Aplikasi ini telah membuat proses administrasi kami lebih cepat dan mudah. Pencatatan kehadiran otomatis, pengelolaan lembur yang terintegrasi, dan penggajian yang akurat membuat kami dapat fokus pada hal-hal yang lebih penting. Pengajuan cuti online juga sangat efisien, menghemat waktu bagi karyawan dan manajemen."</p>
                                    </blockquote>
                                    <div className="author">
                                        <strong className="d-block text-black">John Campbell</strong>
                                        <span>CEO & Co-founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="testimonial-half d-lg-flex bg-white">
                            <div className="img" style={{ backgroundImage: `url(${testi3})` }}>
                                </div>
                                <div className="text">
                                    <blockquote>
                                        <p>"Shift Master ini benar-benar telah merevolusi cara kami mengelola karyawan. Proses yang dulunya memakan waktu dan rentan kesalahan sekarang menjadi otomatis dan sangat efisien. Pengajuan cuti online yang mudah dan sistem penggajian yang akurat sangat membantu dalam meningkatkan produktivitas tim kami. Sangat direkomendasikan untuk perusahaan yang ingin mengoptimalkan manajemen sumber daya manusia mereka!"</p>
                                    </blockquote>
                                    <div className="author">
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
  
      <Footer/>
    </div>
  )
}

export default Home
