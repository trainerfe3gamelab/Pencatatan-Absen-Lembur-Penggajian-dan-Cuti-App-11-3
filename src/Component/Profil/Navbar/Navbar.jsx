import React from 'react';
import './Navbar.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import buttonIcon from '../../../Image/Slider.png';  
import Gaji from '../../../Page/Table/gaji';
import Cuti from '../../../Page/Table/cuti';
import Lembur from '../../../Page/Table/lembur';
import Absen from '../../../Page/Table/absen';


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
