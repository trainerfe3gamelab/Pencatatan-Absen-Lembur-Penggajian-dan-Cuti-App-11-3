import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Navbar from '../../components/Navbar/navbar'; 
import Home from './home';
import Tentang from './tentang';
import Fitur from './fitur';
import Benefit from './benefit';
import Contact from './contact';

const LandingPage = () => {
  return (
    <div>
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Tentang" element={<Tentang />} />
        <Route path="/Fitur" element={<Fitur />} />
        <Route path="/Benefit" element={<Benefit />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
