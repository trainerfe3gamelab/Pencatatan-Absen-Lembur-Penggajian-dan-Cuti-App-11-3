import React from 'react';
import './Profil.css';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'; // Import Image component from react-bootstrap

const Profil = () => {
  return (
    <div className="profil-container">
      <div className="card">
        <h4>My Profil</h4>
        <Col xs={6} md={4} className="image-container"> {/* Tambahkan class image-container */}
          {/* 
            Using placeholder for Image source
            Replace src attribute with your actual image source
          */}
          <Image src="https://via.placeholder.com/171x180" roundedCircle style={{ width: '201px', height: '121px' }} />
          {/* 
            Adjust width and height style properties according to your image dimensions 
            to make sure it's displayed as a perfect circle
          */}
        </Col>
        <div className="card-content">
          <h3>Nama Lengkap</h3>
          <p>Deskripsi singkat atau detail profil.</p>
          <div className='sub-content'>
            <h6>Jabatan</h6>
            <p>HRD</p>
          </div>
          <div className='sub-content'>
            <h6>nomor telepone</h6>
            <p>089725167</p>
          </div>
          <div className='sub-content'>
            <h6>email</h6>
            <p>ahmed@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
