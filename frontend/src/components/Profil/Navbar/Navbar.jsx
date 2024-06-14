import React from 'react';
import './Navbar.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'; 
import Gaji from '../../../pages/User/Table/gaji';
import Cuti from '../../../pages/User/Table/cuti';
import Lembur from '../../../pages/User/Table/lembur';
import Absen from '../../../pages/User/Table/absen';


const Navbar = () => {


  return (
    <div className="navbar-container">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="gaji" title={<span style={{color: '#004E5E'}}>gaji</span>}>
          <Gaji/>
        </Tab>
        <Tab eventKey="lembur" title={<span style={{color: '#004E5E'}}>lembur</span>}>
          <Lembur/>
        </Tab>
        <Tab eventKey="cuti" title={<span style={{color: '#004E5E'}}>cuti</span>}>
          <Cuti/>
        </Tab>
        <Tab eventKey="riwayatpresensi" title={<span style={{color: '#004E5E'}}>Riwayat Presensi</span>}>
          <Absen/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Navbar;
