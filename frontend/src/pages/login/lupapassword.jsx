import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Success from "../../image/success.png";
import Failed from "../../image/failed.png";
import { Modal, Button } from "react-bootstrap";
import logo from "../../image/logo-login.png";
import { API_URL } from "../../helpers/networt";

const Lupapassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenCode, setTokenCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [failedMessage, setFailedMessage] = useState("");
  const new_password = "12345678";
  const confirm_new_password = "12345678";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleShowSuccess = () => setShowSuccessModal(true);

  const handleCloseFailed = () => setShowFailedModal(false);
  const handleShowFailed = (message) => {
    setFailedMessage(message);
    setShowFailedModal(true);
  };

  const handleSendToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password/token`, {
        email, new_password, confirm_new_password
      });
      console.log(response.data);
      setShowTokenInput(true);
    } catch (error) {
      console.error("Failed to send token:", error);
      alert("Failed to send token!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      handleShowFailed("Passwords do not match!");
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
        email,
        new_password: password,
        confirm_new_password: confirmPassword,
        token: tokenCode,
      });
      console.log(response.data);
      if (response.data.status === "sukses") {
        handleShowSuccess();
        navigate('/Login');
      } else {
        handleShowFailed(response.data.message);
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            handleShowFailed("Token Sudah Kadaluarsa atau Digunakan");
            break;
          case 404:
            handleShowFailed("User tidak ditemukan");
            break;
          case 500:
            handleShowFailed("Terjadi error pada server");
            break;
          default:
            handleShowFailed("Password reset failed!");
        }
      } else {
        handleShowFailed("Password reset failed!");
      }
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };


  return (
    <div className="body">
      <div className="logo">
        <img src={logo} alt="Logo" width={"100px"} />
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="wrapper-login">
          <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <div className="input-box">
              <label htmlFor="" className="ps-4  fs-6">masukan email anda yang sudah terdaftar</label>
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {showTokenInput && (
              <> 
                <div className="input-box mt-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderColor: passwordError ? "red" : "" }}
                  />
                  <i className="bx" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <i className="bx bx-show"></i>
                    ) : (
                      <i className="bx bx-low-vision"></i>
                    )}
                  </i>
                </div>
                <div className="input-box">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ borderColor: passwordError ? "red" : "" }}
                  />
                  <i className="bx" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? (
                      <i className="bx bx-show"></i>
                    ) : (
                      <i className="bx bx-low-vision"></i>
                    )}
                  </i>
                  <label htmlFor="" className="ps-4 mt-2  fs-6">cek email anda untuk mendapatkan token jika token kadarluarsa klik <a href="#" onClick={reloadPage} >dapatkan token</a></label>
                  
                </div>
                <div className="input-box mt-5 pt-4">
                
                  <input
                    type="text"
                    placeholder="Enter token code"
                    value={tokenCode}
                    onChange={(e) => setTokenCode(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {!showTokenInput && (
              <button
                type="button"
                className="btn mb-3"
                onClick={handleSendToken}
              >
                Send Token
              </button>
            )}
            {showTokenInput && (
              <button type="submit" className="btn">
                Reset Password
              </button>
            )}
            <div className="register-link mt-5">
              <p>
                <a href="#" onClick={() => navigate('/Login')}>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccess}>
        <Modal.Body className="text-center mt-5">
          <img src={Success} alt="success" width={70} />
          <h5 className="mt-3">Berhasil</h5>
          <p>Data berhasil disimpan</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleCloseSuccess}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Failed Modal */}
      <Modal show={showFailedModal} onHide={handleCloseFailed}>
        <Modal.Body className="text-center mt-5">
          <img src={Failed} alt="Failed" width={70} />
          <h5 className="mt-3">Gagal</h5>
          <p>{failedMessage}</p>
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

export default Lupapassword;
