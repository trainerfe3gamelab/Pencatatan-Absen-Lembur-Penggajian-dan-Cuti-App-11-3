import React, { useState, useEffect } from 'react';
import './Profil.css';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { API_URL } from "../../helpers/networt";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profil = () => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [decodedToken, setDecodedToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(false);
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
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
      setProfile({
        ...profile,
        profile_picture: file,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const koneksi = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        const response = await axios.get(
          `${API_URL}/api/employee/users/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          email,
          password,
          gender,
          name,
          address,
          phone_number,
          profile_picture,
        } = response.data.data;
        setProfile({
          email,
          password,
          gender,
          name,
          address,
          phone_number,
          profile_picture,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  };

  useEffect(() => {
    koneksi();
  }, []);
  

  return (
    <div className="profil-container">
      <div className="card">
        <h4 className='mt-5'>My Profil</h4>
        <Col xs={6} md={4} className="image-container">
          <Image  src={
              profilePicture !== false
                ? profilePicture
                : profile.profile_picture
                ? `${API_URL}/${profile.profile_picture}`
                : profilePicture
            } roundedCircle style={{ width: '201px', height: '121px' }} />
        </Col>
        <div className="card-content">
          <h3>{profile.name}</h3>
          <p>Deskripsi singkat atau detail profil.</p>
          <div className='sub-content'>
            <h6>Alamat</h6>
            <p>{profile.address}</p>
          </div>
          <div className='sub-content'>
            <h6>Nomor Telepon</h6>
            <p>{profile.phone_number}</p>
          </div>
          <div className='sub-content'>
            <h6>Email</h6>
            <p>{profile.email}</p>
          </div>
          <div className="button-profil">
            <Button className="custom-button-profil" onClick={handleShow}>Edit Profil</Button>
          </div>
          <div>
          <button className='btn ' onClick={() => navigate('/Login')}>Log Out</button>
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