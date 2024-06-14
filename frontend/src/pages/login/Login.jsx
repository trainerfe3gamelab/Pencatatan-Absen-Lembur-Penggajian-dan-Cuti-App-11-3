import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "../../image/logo-login.png";
import { API_URL } from "../../helpers/networt";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      alert("Login failed!");
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
    </div>
  );
};

export default Login;
