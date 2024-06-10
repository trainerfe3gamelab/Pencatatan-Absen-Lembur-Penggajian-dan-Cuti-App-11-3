import React from 'react'
import Footer from '../../components/footer/footer';

const contact = () => {
  return (
    <div>
      <div className="hero overlay inner-page">
        <div className="container centered-content">
          <div className="row align-items-center justify-content-center text-center pt-5">
            <div className="col-lg-6">
              <h1 className="heading text-white mb-3" data-aos="fade-up">Hubungi Kami</h1>
              <p>Segala jenis pertanyaan seputar Layanan Shift Master akan kami jawab dengan
						penuh senang hati</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-info">
              <div className="address mt-2">
                <i className="bi-geo-alt"></i>
                <h4 className="mb-2">Location:</h4>
                <p>Perum. Griya Palem Indah B-17 <br /> Jember Jawa Timur 61419</p>
              </div>
              <div className="email mt-4">
                <i className="bi-envelope"></i>
                <h4 className="mb-2">Email:</h4>
                <p>ShiftMaster@gmail.com</p>
              </div>
              <div className="phone mt-4">
                <i className="bi-whatsapp"></i>
                <h4 className="mb-2">No. Telp/WA</h4>
                <p>+62 823-3089-1112</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <form action="#">
              <div className="row">
                <div className="col-6 mb-3">
                  <input type="text" className="form-control" placeholder="Nama Lengkap" />
                </div>
                <div className="col-6 mb-3">
                  <input type="email" className="form-control" placeholder="Alamat Email" />
                </div>
                <div className="col-12 mb-3">
                  <input type="text" className="form-control" placeholder="No. Telp/WA" />
                </div>
                <div className="col-12 mb-3">
                  <textarea cols="30" rows="7" className="form-control" placeholder="Tulis Pesan Anda"></textarea>
                </div>
                <div className="col-12">
                  <input type="submit" value="Kirim Pesan" className="btn btn-primary" />
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
