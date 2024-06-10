import React from 'react'
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
      <div className="hero overlay inner-page">
        <div className="container centered-content">
          <div className="row align-items-center justify-content-center text-center pt-5">
            <div className="col-lg-6">
              <h1 className="heading text-white mb-3" data-aos="fade-up">Benefit dari Shift Master</h1>
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
              <p style={{ textAlign: 'justify' }}>Alasan kenapa Anda harus menggunakan Shift Master segera.</p>
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
                <a href="#" className="btn btn-primary">HUBUNGI KAMI</a><br /><br /><br />
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
                    <h6 className="theme-color">Abdur Rohim</h6>
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
