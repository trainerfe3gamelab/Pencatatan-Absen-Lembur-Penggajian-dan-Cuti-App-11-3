import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState({
    dataMaster: false,
    chat: false,
    setting: false
  });

  const toggleMenu = (menu) => {
    setMenuState(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'close'}`}>
      <div className="logo-details mt-3">
        <i className="text-white">
          <img src="/assets/imgs/lgposyandu.svg" width="50px" height="50px" alt="" />
        </i>
        <span className="logo_name">E-Posyandu</span>
      </div>
      <ul className="nav-links">
        <li>
        
         <a href="" onClick={() => navigate('/admin/dashboard')}>
            <i className='bx bx-grid-alt'></i>
            <span className="link_name">Dashboard</span>
            </a>
            
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Dashboard</a></li>
          </ul>
          
        </li>
        
        <li className={menuState.dataMaster ? 'dropmenu' : ''}>
          <div className="iocn-link">
            <a href="#">
              <i className='bx bx-collection'></i>
              <span className="link_name">Data Master</span>
            </a>
            <i
              className={`bx bxs-chevron-down arrow ${menuState.dataMaster ? 'active' : ''}`}
              onClick={() => toggleMenu('dataMaster')}
            ></i>
          </div>
          <ul className={`sub-menu ${menuState.dataMaster ? 'showMenu' : ''}`}>
            <li><a className="link_name" href="#">Data Master</a></li>
            <li>
              <div className="bg-down">
                <a href="#" className="klik-down" style={{ paddingLeft: '10px' }}>Data anak</a>
              </div>
            </li>
            <li>
              <div className="bg-down">
                <a href="#" className="klik-down" style={{ paddingLeft: '10px' }}>Data anak</a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-conversation'></i>
            <span className="link_name">Recap</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Recap</a></li>
          </ul>
        </li>
        <li>
       
         <a href="" onClick={() => navigate('/admin/pengaturan')}>
            <i className='bx bx-cog'></i>
            <span className="link_name">Setting</span>
            </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#" onClick={() => navigate('/admin/pengaturan')}>Setting</a></li>
          </ul>
          
        </li>
        <li>
        <a href="" onClick={() => navigate('/')}>
            <i className='bx bx-log-out'></i>
            <span className="link_name">Log Out</span>
            </a>
          <ul className="sub-menu blank">
            <li><a className="link_name logoutfilter" href="#" onClick={() => navigate('/')}>Log Out</a></li>
          </ul>
          
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
