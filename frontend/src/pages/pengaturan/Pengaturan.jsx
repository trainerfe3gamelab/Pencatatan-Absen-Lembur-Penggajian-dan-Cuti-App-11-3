import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Success from "../../image/success.png";
import Failed from "../../image/failed.png";

import axios from "axios";
import { API_URL } from "../../helpers/networt";
import { jwtDecode } from "jwt-decode";

const Pengaturan = () => {
  const [profile, setProfile] = useState({});
  const [decodedToken, setDecodedToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleShowSuccess = () => setShowSuccessModal(true);

  const handleCloseFailed = () => setShowFailedModal(false);
  const handleShowFailed = () => setShowFailedModal(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

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

  const updateProfile = async (data) => {
    try {
      const formDataToSend = new FormData();
      for (const key in data) {
        console.log(key);
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof File) {
            formDataToSend.append(key, data[key]);
          } else {
            formDataToSend.append(key, data[key]);
          }
        }
      }
      console.log(formDataToSend);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/admin/users/${decodedToken.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form data submitted:", response.data);
      handleShowSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      handleShowFailed();
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
    console.log(updatedProfile);
  };

  const koneksi = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        const response = await axios.get(
          `${API_URL}/api/admin/users/${decoded.id}`,
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
    <div className="container">
      <h1 className="mt-3 mb-3">
        <b>Pengaturan</b>
      </h1>
      <Form
        className="row border rounded-5 p-5 gap-3 d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="col-12 col-md-3 bg-secondary p-3 rounded-circle position-relative d-flex justify-content-center align-items-center">
          <img
            className="img-fluid rounded-circle"
            src={
              profilePicture !== false
                ? profilePicture
                : profile.profile_picture
                ? `${API_URL}/${profile.profile_picture}`
                : profilePicture
            }
            alt="Profile"
          />
          <button
            type="button"
            className="btn btn-success position-absolute"
            onClick={handleButtonClick}
            style={{
              bottom: "10px",
              right: "10px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1 className="fw-bold mb-5">Profil</h1>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Nama</Form.Label>
                <Form.Control
                  className="rounded-4"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Alamat</Form.Label>
                <Form.Control
                  className="rounded-4"
                  type="text"
                  name="address"
                  value={profile.address}
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
                <Form.Group controlId="formTelepon">
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="rounded-4"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-12 col-md-6">
              <h1 className="fw-bold mb-5">Sandi</h1>
              <Form.Group className="mb-5">
                <Form.Label className="text-muted">
                  Gunakan sandi yang aman untuk melindungi akun anda
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    className="rounded-4"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={profile.password}
                  />
                  <i
                    className={`bi ${
                      passwordVisible ? "bi-eye-slash" : "bi-eye"
                    } position-absolute`}
                    onClick={togglePasswordVisibility}
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="text-white me-2 w-100"
                  style={{
                    borderRadius: "15px",
                    height: "40px",
                    background: "linear-gradient(-45deg, #0C624D, #18C89E)",
                  }}
                >
                  Simpan
                </Button>
              </Form.Group>
            </div>
          </div>
        </div>
      </Form>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccess}>
        <Modal.Body className="text-center mt-5">
          <img src={Success} alt="success" width={70} />
          <h5 className="mt-3">Berhasil</h5>
          <p>Data berhasil disimpan</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}></Modal.Footer>
      </Modal>

      {/* Failed Modal */}
      <Modal show={showFailedModal} onHide={handleCloseFailed}>
        <Modal.Body className="text-center mt-5">
          <img src={Failed} alt="Failed" width={70} />
          <h5 className="mt-3">Gagal</h5>
          <p>Data gagal disimpan</p>
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

export default Pengaturan;
