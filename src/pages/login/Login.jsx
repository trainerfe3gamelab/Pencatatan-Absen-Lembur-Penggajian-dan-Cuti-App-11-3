import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import logo from '../../image/logo-login.png';


const Login = () => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='body'>
      <div className='logo'>
        <img src={logo} alt="Logo" width={'100px'} />
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="wrapper-login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="masukan email anda        @gmail.com" required />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                
              />
              <i className="bx" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className='bx bx-show'></i>
                ) : (
                  <i className='bx bx-low-vision'></i>
                )}
              </i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
            </div>
            <button type="submit" className="btn" onClick={() => navigate('/Admin')}>Login</button>
            <div className="register-link">
              <p><a href="#">klik disini  </a> jika anda lupa sandi</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
