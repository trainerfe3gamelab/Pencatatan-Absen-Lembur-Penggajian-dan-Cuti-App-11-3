import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/Logo.png';
import styles from '../../pages/LandingPage/LandingPage.module.css';

const Navbar = () => {
    const navigate = useNavigate();

    // Function to open and close the side panel
    const openNav = () => {
        document.getElementById("mySidepanel").style.width = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidepanel").style.width = "0";
    };

    useEffect(() => {
        // Function to clone and set up the menu
        const siteMenuClone = () => {
            // Logic for cloning the menu or other initialization
        };

        siteMenuClone();
    }, []);

    return (
        <div>
            <nav className={styles["site-nav"]}>
                <div className={styles.container}>
                    <div className={styles["menu-bg-wrap"]}>
                        <div className={styles["site-navigation"]}>
                            <div className="row g-0 align-items-center">
                                <div className="col-2">
                                    <a href="#">
                                        <img src={logo} alt="Logo" style={{ height: '40px' }} />
                                    </a>
                                </div>
                                <div className="col-8 text-center">
                                    <ul className={`js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto ${styles["site-menu"]}`}>
                                        <li style={{ color: 'white' }}>
                                            <a onClick={() => navigate('/')} href="#" style={{ cursor: 'pointer' }}>HOME</a>
                                        </li>
                                        <li><a onClick={() => navigate('/Tentang')} href="#">TENTANG</a></li>
                                        <li><a onClick={() => navigate('/Fitur')} href="#">FITUR</a></li>
                                        <li><a onClick={() => navigate('/Benefit')} href="#">BENEFIT</a></li>
                                        <li><a onClick={() => navigate('/Contact')} href="#">HUBUNGI KAMI</a></li>
                                    </ul>
                                </div>
                                <div className={`col-2 d-flex align-items-center`}>
                                <a onClick={() => navigate('/Login')} href="#" className={`${styles["btn"]} ${styles["btn-outline-white-reverse"]} ${styles["responsive-demo-button"]} ${styles["sembunyikan"]}`} style={{ transform: 'translateX(-90%)' }}>
    <span>Demo Aplikasi</span>
</a>

                                    <a href="#" className={`${styles["burger"]} ${styles["ms-auto"]} ${styles["site-menu-toggle"]} ${styles["js-menu-toggle"]} ${styles["d-inline-block"]} ${styles["d-lg-none"]} ${styles["light"]}`} onClick={openNav}></a>
                                    <div id="mySidepanel" className={styles["sidepanel"]}>
                                        <a href="javascript:void(0)" className={styles["closebtn"]} onClick={closeNav}>×</a>
                                        <a onClick={() => navigate('/')} href="#" style={{ cursor: 'pointer' }}>HOME</a>
                                        <a onClick={() => navigate('/Tentang')} href="#">TENTANG</a>
                                        <a onClick={() => navigate('/Fitur')} href="#">FITUR</a>
                                        <a onClick={() => navigate('/Benefit')} href="#">BENEFIT</a>
                                        <a onClick={() => navigate('/Contact')} href="#">HUBUNGI KAMI</a>
                                        <a onClick={() => navigate('/Login')} href="#">DEMO APLIKASI</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="mySidepanel" className={styles["site-mobile-menu"]}>
                <div className={styles["site-mobile-menu-header"]}>
                    <div className={styles["site-mobile-menu-close"]} onClick={closeNav}>
                        <span className={`icon-close2 js-menu-toggle ${styles["js-menu-toggle"]}`}></span>
                    </div>
                </div>
                <div className={styles["site-mobile-menu-body"]}></div>
            </div>
        </div>
    );
};

export default Navbar;
