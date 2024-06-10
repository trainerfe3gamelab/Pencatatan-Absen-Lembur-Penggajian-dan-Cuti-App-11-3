import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/Logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    // Fungsi untuk membuka WhatsApp
    const handleDemoClick = () => {
        const phoneNumber = '6283873221905';
        window.location.href = `whatsapp://send?phone=${phoneNumber}`;
    };

    // Fungsi untuk membuka dan menutup sidepanel
    const openNav = () => {
        document.getElementById("mySidepanel").style.width = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidepanel").style.width = "0";
    };

    useEffect(() => {
        // Fungsi untuk mengklon dan mengatur menu
        const siteMenuClone = () => {
            // Logika kloning menu atau inisialisasi lainnya
        };

        siteMenuClone();
    }, []);

    return (
        <div>
            <nav className="site-nav">
                <div className="container">
                    <div className="menu-bg-wrap">
                        <div className="site-navigation">
                            <div className="row g-0 align-items-center">
                                <div className="col-2">
                                    <a href="#">
                                        <img src={logo} alt="Logo" style={{ height: '40px' }} />
                                    </a>
                                </div>
                                <div className="col-8 text-center">
                                    <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto">
                                        <li style={{ color: 'white' }}>
                                            <a onClick={() => navigate('/')} href="#" style={{ cursor: 'pointer' }}>HOME</a>
                                        </li>
                                        <li><a onClick={() => navigate('/Tentang')} href="#">TENTANG</a></li>
                                        <li><a onClick={() => navigate('/Fitur')} href="#">FITUR</a></li>
                                        <li><a onClick={() => navigate('/Benefit')} href="#">BENEFIT</a></li>
                                        <li><a onClick={() => navigate('/Contact')} href="#">HUBUNGI KAMI</a></li>
                                    </ul>
                                </div>
                                <div className="col-2 text-end d-flex align-items-center justify-content-end">
                                    <a onClick={handleDemoClick} href="#" className="btn btn-outline-white-reverse responsive-demo-button" style={{ whiteSpace: 'nowrap' }}>
                                        <span>Minta Demo Aplikasi</span>
                                    </a>    
                                    <a href="#" className="burger ms-auto site-menu-toggle js-menu-toggle d-inline-block d-lg-none light" onClick={openNav}></a>
                                    <div id="mySidepanel" className="sidepanel">
                                        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                                        <a onClick={() => navigate('/')} href="#" style={{ cursor: 'pointer' }}>HOME</a>
                                        <a onClick={() => navigate('/Tentang')} href="#">TENTANG</a>
                                        <a onClick={() => navigate('/Fitur')} href="#">FITUR</a>
                                        <a onClick={() => navigate('/Benefit')} href="#">BENEFIT</a>
                                        <a onClick={() => navigate('/Contact')} href="#">HUBUNGI KAMI</a>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="mySidepanel" className="site-mobile-menu">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3" onClick={closeNav}>
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
        </div>
    );
};

export default Navbar;
