import React, { useState } from 'react';
import picture from '../../image/pegawai.png';
import { Button, Form } from 'react-bootstrap';


const Pengaturan = () => {
  const [profilePicture, setProfilePicture] = useState(picture);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-3"><b>Pengaturan</b></h1>
      <div className="row border rounded-5 p-5 gap-3 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-3 bg-secondary p-3 rounded-circle position-relative d-flex justify-content-center align-items-center">
          <img className="img-fluid rounded-circle" src={profilePicture} alt="Profile" />
          <button
            className="btn btn-success position-absolute"
            onClick={handleButtonClick}
            style={{
              bottom: '10px',
              right: '10px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12 col-md-4">
          <h1 className="fw-bold mb-5">Profil</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Nama</Form.Label>
              <Form.Control
                className="rounded-4"
                type="text"
                name="name"
                value={'Ucup'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="rounded-4"
                type="email"
                name="email"
                value={'Ucup1234@gmail.com'}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="col-12 col-md-4">
          <h1 className="fw-bold mb-5">Sandi</h1>
          <Form>
            <Form.Group className="mb-5">
              <Form.Label className="text-muted">Gunakan sandi yang aman untuk melindungi akun anda</Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="rounded-4"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                />
                <i
                  className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                  onClick={togglePasswordVisibility}
                  style={{
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                ></i>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button
                variant="primary"
                className="text-white me-2 w-100"
                style={{
                  borderRadius: '15px',
                  height: '40px',
                  background: 'linear-gradient(-45deg, #0C624D, #18C89E)'
                }}
              >
                Simpan
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
