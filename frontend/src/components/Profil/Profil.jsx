import React, { useState, useEffect } from "react";
import "./Profil.css";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../helpers/networt";
import { jwtDecode } from "jwt-decode"; // Perbaikan import
import { useNavigate } from "react-router-dom";
import Success from "../../image/success.png";
import Failed from "../../image/failed.png";

const Profil = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [decodedToken, setDecodedToken] = useState("");
  const [profilePicture, setProfilePicture] = useState(false);
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [positions, setPositions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleShowSuccess = () => setShowSuccessModal(true);

  const handleCloseFailed = () => setShowFailedModal(false);
  const handleShowFailed = () => setShowFailedModal(true);

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

        // Get user data
        const userResponse = await axios.get(`${API_URL}/api/employee/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = userResponse.data.data;

        // Get position data
        const positionResponse = await axios.get(
          `${API_URL}/api/employee/positions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPositions(positionResponse.data.data);
        const positions = positionResponse.data.data;
        const userPosition = positions.find(
          (position) => position.id === user.position_id
        );

        // Set profile state
        setProfile({
          email: user.email,
          gender: user.gender,
          name: user.name,
          address: user.address,
          phone_number: user.phone_number,
          profile_picture: user.profile_picture,
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

  const updateProfile = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof File) {
            formData.append(key, data[key]);
          } else {
            formData.append(key, data[key]);
          }
        }
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/employee/users/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      console.log(response.data.data);

      // Handle success modal and reload page
      handleShowSuccess();
      window.location.reload(); // You may consider using React state to update UI instead of reloading the entire page
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan");
      handleShowFailed(); // Show failed modal
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProfile = {};

    for (const [key, value] of Object.entries(profile)) {
      if (value !== "") {
        updatedProfile[key] = value;
      }
    }
    if (typeof updatedProfile.profile_picture === "string") {
      delete updatedProfile.profile_picture;
    }
    updateProfile(updatedProfile);
  };

  return (
    <div className="profil-container">
      <div className="card">
        <h4 className="mt-5">My Profil</h4>
        <Col xs={6} md={4} className="image-container">
          <Image
            src={
              profilePicture !== false
                ? profilePicture
                : profile.profile_picture
                ? `${API_URL}/${profile.profile_picture}`
                : profilePicture
            }
            roundedCircle
            style={{ width: "201px", height: "121px" }}
          />
        </Col>
        <div className="card-content">
          <h3>{profile.name}</h3>
          <p>Deskripsi singkat atau detail profil.</p>
          <div className="sub-content">
            <h6>Jabatan</h6>
            <p>{profile.position_name}</p>
          </div>
          <div className="sub-content">
            <h6>Nomor Telepon</h6>
            <p>{profile.phone_number}</p>
          </div>
          <div className="sub-content">
            <h6>Email</h6>
            <p>{profile.email}</p>
          </div>
          <div className="button-profil">
            <Button className="custom-button-profil" onClick={handleShow}>
              Edit Profil
            </Button>
            <button
              className="btn-logout"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/Login");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>Edit Profil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFoto">
              <Form.Label>Foto Profil</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group controlId="formNama">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="laki-laki">laki-laki</option>
                <option value="perempuan">perempuan</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTelepon">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={profile.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccess}>
        <Modal.Body className="text-center mt-5">
          {/* <img src={Success} alt="success" width={70} /> */}
          <h4 className="mt-4 text-success fw-bold">Berhasil</h4>
          <p>Data berhasil disimpan</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}></Modal.Footer>
      </Modal>

      {/* Failed Modal */}
      <Modal show={showFailedModal} onHide={handleCloseFailed}>
        <Modal.Body className="text-center mt-5">
          <img src={Failed} alt="Failed" width={70} />
          <h5 className="mt-3">Gagal</h5>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleCloseFailed}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profil;
