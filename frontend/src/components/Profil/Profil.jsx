import React, { useState } from 'react';
import './Profil.css';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../helpers/networt";
import axios from "axios";

const Profil = () => {
  const [show, setShow] = useState(false);
  const [nama, setNama] = useState('Nama Lengkap');
  const [jabatan, setJabatan] = useState('HRD');
  const [telepon, setTelepon] = useState('089725167');
  const [email, setEmail] = useState('ahmed@gmail.com');
  const [foto, setFoto] = useState('https://via.placeholder.com/171x180');
  const [fotoFile, setFotoFile] = useState(null);
  const [notificationShown, setNotificationShown] = useState(false); // Definisikan notificationShown

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveAndNotify = () => {
    handleSave();

  }
  
  const handleSave = () => {
    let updated = false; // Inisialisasi variabel untuk menandai apakah ada pembaruan data
  
    if (fotoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(fotoFile);
      updated = true; // Tandai bahwa ada pembaruan pada foto
    }
  
    // Periksa apakah ada pembaruan pada data lainnya
    if (nama !== 'Nama Lengkap' || jabatan !== 'HRD' || telepon !== '089725167' || email !== 'ahmed@gmail.com') {
      updated = true; // Tandai bahwa ada pembaruan pada data lainnya
    }
  
    // Panggil notifikasi hanya jika ada pembaruan yang dilakukan dan belum ada notifikasi sebelumnya
    if (updated && !notificationShown) {
      notify();
      setNotificationShown(true); // Set state untuk menandai bahwa notifikasi telah ditampilkan
    }
  
    setShow(false); // Tutup modal setelah proses penyimpanan selesai
  }
  
  const handleFotoChange = (e) => {
    setFotoFile(e.target.files[0]);
  }
  
  const notify = () => toast.success("Berhasil Tersimpan!");
  
  

  return (
    <div className="profil-container">
      <div className="card">
        <h4>My Profil</h4>
        <Col xs={6} md={4} className="image-container">
          <Image src={foto} roundedCircle style={{ width: '201px', height: '121px' }} />
        </Col>
        <div className="card-content">
          <h3>{nama}</h3>
          <p>Deskripsi singkat atau detail profil.</p>
          <div className='sub-content'>
            <h6>Jabatan</h6>
            <p>{jabatan}</p>
          </div>
          <div className='sub-content'>
            <h6>Nomor Telepon</h6>
            <p>{telepon}</p>
          </div>
          <div className='sub-content'>
            <h6>Email</h6>
            <p>{email}</p>
          </div>
          <div className="button-profil">
            <Button className="custom-button-profil" onClick={handleShow}>Edit Profil</Button>
          </div>
        </div>
      </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFoto">
                <Form.Label>Foto Profil</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFotoChange} />
              </Form.Group>
              <Form.Group controlId="formNama">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formJabatan">
                <Form.Label>Jabatan</Form.Label>
                <Form.Control type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formTelepon">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="text" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveAndNotify}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Profil;