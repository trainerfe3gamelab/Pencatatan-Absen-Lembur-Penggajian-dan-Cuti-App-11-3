import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import "./Login.css";
import logo from "../../image/logo-login.png";
import Failed from "../../image/failed.png";
import { API_URL } from "../../helpers/networt";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showFailedModal, setShowFailedModal] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseFailed = () => setShowFailedModal(false);
  const handleShowFailed = () => setShowFailedModal(true);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const userRole = response.data.user.role;
      localStorage.setItem("token", response.data.token);
      
  
      if (userRole === "admin") {
        navigate("/Admin");
      } else if (userRole === "employee") {
        navigate("/User");
      } else {
        throw Error("Invalid Role");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan");
      handleShowFailed();
    }
  };

  return (
    <div className="body">
      <div className="logo">
        <img src={logo} alt="Logo" width={"100px"} />
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="wrapper-login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="masukan email anda@gmail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="bx bx-show"></i>
                ) : (
                  <i className="bx bx-low-vision"></i>
                )}
              </i>
            </div>
            <div className="remember-forgot">
              {/* <label>
                <input type="checkbox" /> Remember Me
              </label> */}
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                <a href="#" onClick={() => navigate('/forgot-password')}>klik disini </a> jika anda lupa sandi
              </p>
            </div>
          </form>
        </div>
      </div>
       {/* Failed Modal */}
       <Modal show={showFailedModal} onHide={handleCloseFailed}>
                <Modal.Body className="text-center mt-5">
                    <img src={Failed} alt="Failed" width={70} />
                    <h5 className="mt-3">Gagal</h5>
                    <p>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleCloseFailed}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
};

export default Login;
