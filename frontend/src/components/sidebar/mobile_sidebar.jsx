import React, { useState, useEffect } from "react";
import { Offcanvas, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../image/lg-kecil.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../helpers/networt";
import { jwtDecode } from "jwt-decode";

const MobileSidebar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [decodedToken, setDecodedToken] = useState("");
  const [profilePicture, setProfilePicture] = useState(false);

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
              "Authorization": `Bearer ${token}`,
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
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 ">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand href="#">
              <h1 className='fw-bold'>Admin</h1>
            </Navbar.Brand>
            <Navbar.Brand href="#">
              <div className="wrapperuser">
                <p className="pt-4 nameuser">{profile.name}</p>
                <div className="user">
                  <img className="pp" src={
                      profilePicture !== false
                        ? profilePicture
                        : profile.profile_picture
                          ? `${API_URL}/${profile.profile_picture}`
                          : profilePicture
                    } alt="" />
                </div>
              </div>
            </Navbar.Brand>


            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ background: 'linear-gradient(#18C89E, #004E5E)', width: '260px' }}
              className="text-white"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='d-flex  align-items-center justify-content-center'>
                  <img src={logo} width="50px" height="50px" alt="" />
                  <h1>ShiftMaster</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='ps-5'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/dashboard')}>
                    <p className="link_name fs-2 "> <i className='bx bx-grid-alt me-3'></i> Dashboard</p>
                  </Nav.Link>
                  <NavDropdown
                    title={<p className="link_name fs-2 "> <i className='bx bx-collection me-3'></i> Data Master</p>}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3" onClick={() => navigate('/admin/Pegawai')}>
                      Pegawai
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4" onClick={() => navigate('/admin/Jabatan')}>
                      Jabatan
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5" onClick={() => navigate('/admin/Potongan')}>
                      Potongan Gaji
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5" onClick={() => navigate('/admin/Waktu')}>
                      Waktu Absensi
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5" onClick={() => navigate('/admin/Hari')}>
                      Hari Libur
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/Absensi')}>
                    <p className="link_name fs-2 "> <i className='bx bxs-user-check me-3'></i> Absensi</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/Lembur')}>
                    <p className="link_name fs-2 "> <i className='bx bxs-briefcase-alt-2 me-3'></i> Lembur</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/Cuti')}>
                    <p className="link_name fs-2 "> <i className='bx bxs-calendar-event me-3'></i> Cuti</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/RecapAbsensi')}>
                    <p className="link_name fs-2 "> <i className='bi bi-calendar3 me-3'></i> Recap Absensi</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/RecapGaji')}>
                    <p className="link_name fs-2 "> <i className='bi bi-card-heading me-3'></i> Recap Gaji</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/admin/pengaturan')}>
                    <p className="link_name fs-2 "> <i className='bx bx-cog me-3'></i> Pengaturan</p>
                  </Nav.Link>
                  <Nav.Link href="#action1" onClick={() => navigate('/')}>
                    <p className="link_name fs-2 "> <i className='bx bx-log-out me-3'></i> Log Out</p>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MobileSidebar;
