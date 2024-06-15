import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../image/lg-kecil.png";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState({
    dataMaster: false,
    chat: false,
    recap: false,
    setting: false,
  });

  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "close"} background`}>
      <div className="logo-details mt-3">
        <i className="text-white">
          <img src={logo} width="50px" height="50px" alt="" />
        </i>
        <span className="logo_name">ShiftMaster</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/admin/dashboard">
            <i className="bx bx-grid-alt"></i>
            <span className="link_name">Dashboard</span>
          </Link>

          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/Dashboard")}
              >
                Dashboard
              </a>
            </li>
          </ul>
        </li>

        <li className={menuState.dataMaster ? "dropmenu" : ""}>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-collection"></i>
              <span className="link_name">Data Master</span>
            </a>
            <i
              className={`bx bxs-chevron-down arrow ${
                menuState.dataMaster ? "active" : ""
              }`}
              onClick={() => toggleMenu("dataMaster")}
            ></i>
          </div>
          <ul className={`sub-menu ${menuState.dataMaster ? "showMenu" : ""}`}>
            <li>
              <a className="link_name" href="#">
                Data Master
              </a>
            </li>
            <li>
              <Link to="/admin/pegawai">
                <span
                  href="#"
                  className="klik-down a"
                  style={{ paddingLeft: "10px" }}
                >
                  pegawai
                </span>
              </Link>
            </li>
            <li>
              <div className="bg-down">
                <Link to="/admin/Jabatan">
                  <span
                    href="#"
                    className="klik-down"
                    style={{ paddingLeft: "10px" }}
                  >
                    jabatan
                  </span>
                </Link>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <Link to="/admin/Potongan">
                  <span
                    href="#"
                    className="klik-down"
                    style={{ paddingLeft: "10px" }}
                  >
                    Potongan Gaji
                  </span>
                </Link>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <Link to="/admin/Waktu">
                  <span
                    href="#"
                    className="klik-down"
                    style={{ paddingLeft: "10px" }}
                  >
                    Waktu Absensi
                  </span>
                </Link>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <Link to="/admin/Hari">
                  <span
                    href="#"
                    className="klik-down"
                    style={{ paddingLeft: "10px" }}
                  >
                    Hari Libur
                  </span>
                </Link>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/admin/Absensi">
            <i className="bx bxs-user-check"></i>
            <span className="link_name">Absensi</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/Absensi")}
              >
                Absensi
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/Lembur">
            <i className="bx bxs-briefcase-alt-2"></i>
            <span className="link_name">Lembur</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/Lembur")}
              >
                Lembur
              </a>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/admin/Cuti">
            <i className="bx bxs-calendar-event"></i>
            <span className="link_name">Cuti</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/Cuti")}
              >
                cuti
              </a>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/admin/RecapAbsensi">
            <i className="bi bi-calendar3"></i>
            <span className="link_name">Recap absensi</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/RecapAbsensi")}
              >
                Recap absensi
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/RecapGaji">
            <i className="bi bi-card-heading"></i>
            <span className="link_name">Recap Gaji</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                href="#"
                onClick={() => navigate("/admin/RecapGaji")}
              >
                Recap Gaji
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/pengaturan">
            <i className="bx bx-cog"></i>
            <span className="link_name">Setting</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name"
                onClick={() => navigate("/admin/pengaturan")}
              >
                Setting
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <i className="bx bx-log-out"></i>
            <span className="link_name">Log Out</span>
          </a>
          <ul className="sub-menu blank">
            <li>
              <a
                className="link_name logoutfilter"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Log Out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
