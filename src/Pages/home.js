import React from 'react'

import './CSS/home.css'
import {Link} from "react-router-dom";

const Home = (props) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    console.log('wassim')
    return (
        <div className="home-container">
            <section id="home" className="home-hero">
                <div className="home-background">
                    <img
                        alt="image"
                        src="/playground_assets/circle-background.svg"
                        className="home-image"
                    />
                    <img
                        alt="image"
                        src="/playground_assets/line-background.svg"
                        className="home-image01"
                    />
                </div>
                <header data-thq="thq-navbar" className="home-navbar">
                    <img
                        alt="pastedImage"
                        src="/playground_assets/pastedimage-bxbm-1400w.png"
                        className="home-pasted-image"
                    />
                    <div
                        data-thq="thq-navbar-nav"
                        data-role="Nav"
                        className="home-desktop-menu"
                    >
                        <nav
                            data-thq="thq-navbar-nav-links"
                            data-role="Nav"
                            className="home-nav"
                        >
                            <a href="#home" className="home-link navLink">
                                Home
                            </a>
                            <a href="#about" className="home-link1 navLink">
                                About
                            </a>
                            <a href="#why" className="home-link2 navLink">
                                Why
                            </a>
                            <a href="#contact" className="home-link3 navLink">
                                Contact
                            </a>
                        </nav>
                        <Link to="/Login" className="home-register button">
                            <span>Register now</span>
                        </Link>
                    </div>


                </header>
                <div className="home-hero-content">
                    <h1 className="home-text07">
                        <span>
                          Welcome to SMART-EMS
                        </span>
                        <br/>
                        <span>
                            the smart way to manage & allocate your equipment
                        </span>
                    </h1>
                    <div className="home-caption">
                        <button className="home-register2 button-style-1 button">
                            <Link to="/Login" className="home-text11">Register now</Link>
                        </button>
                        <p className="home-caption1">
                            {currentDate} / whitoutwire.inventory.platform
                        </p>
                    </div>
                </div>
            </section>
            <section id="about" className="home-notes">
                <div className="home-first">
                    <div data-aos="fade-up-right" className="home-content">
                        <h2 className="home-header">
                            Efficient equipment management & allocation
                        </h2>
                        <div className="home-list">
                            <div className="home-note">
                                <div className="home-point"/>
                                <p className="home-text12">
                                    SMART-EMS allows managers to allocate
                                    equipment to different locations or users with ease.
                                    This helps to prevent equipment from being underutilized,
                                    while also ensuring that it's available when and where it's needed.
                                </p>
                            </div>
                            <div className="home-note1">
                                <div className="home-point1"/>
                                <p className="home-text13">
                                    It help you to view the available equipment and request to allocate
                                    equipment for your research or coursework.
                                </p>
                            </div>
                        </div>
                    </div>
                    <img
                        alt="image"
                        src="/playground_assets/entrepreneur-with-lot-orders-clipboard.jpg"
                        className="home-image02 image-notes"
                    />
                </div>
                <div className="home-second">
                    <div data-aos="fade-up-left" className="home-content1">
                        <h2 className="home-header1">
                            The SMART-EMS platform provides you with a
                            streamlined and efficient process for accessing and utilizing the equipment
                            and even HPC that you need for your work.
                        </h2>
                        <button className="button button-style-2 home-register3">
                            <span>Register now</span>
                        </button>
                    </div>
                    <img
                        alt="image"
                        src="/playground_assets/personnages-management.jpg"
                        className="image-notes"
                    />
                </div>
            </section>
            <section id="why"className="home-why">
                <div className="home-header2">
                    <div className="home-section-numeral">
                    </div>
                    <div data-aos="fade-right" className="home-heading">
                        <h2 className="home-title">Why SMART-EMS</h2>
                        <p className="home-caption2">
                            By automating equipment allocation and management tasks, SMART-EMS allows
                            researchers, students, and managers to spend less time on administrative
                            tasks and more time on their core activities.
                        </p>
                    </div>
                </div>
                <div className="home-brands">
                    <div className="home-row">
                        <div className="home-item">
                            <img
                                alt="image"
                                src="/playground_assets/why-3.svg"
                                className="home-image04"
                            />
                            <div className="home-details">
                                <h3 className="home-title1">Efficient</h3>
                                <p className="home-description">
                                    can help universities streamline by providing a centralized database
                                    that can be easily accessed by authorized users, Time-saving for
                                    students and researchers by allowing them easily search for equipments they
                                    need and make reservation online
                                </p>
                            </div>
                        </div>
                        <div className="home-item1">
                            <img
                                alt="image"
                                src="/playground_assets/why-2.svg"
                                className="home-image05"
                            />
                            <div className="home-details1">
                                <h3 className="home-title2">Optimizing</h3>
                                <p className="home-description1">
                                    The platform helps prevent equipment from being underutilized
                                    or overused by providing an inventory management system
                                    that tracks the availability and condition of equipment.
                                    This enables efficient allocation and utilization of
                                    equipment, maximizing its value and reducing the risk
                                    of equipment being left unused or wasted.
                                </p>
                            </div>
                        </div>
                        <div className="home-item2">
                            <img
                                alt="image"
                                src="/playground_assets/why-1.svg"
                                className="home-image06"
                            />
                            <div className="home-details2">
                                <h3 className="home-title3">User-friendly</h3>
                                <p className="home-description2">
                                    The platform Smart-EMS simplifies equipment tracking and allocation
                                    for managers, students and researchers. It provides an intuitive and
                                    easy-to-use interface for managing equipment inventory. And also, it makes
                                    facilities in communication between allocation managers and other users
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer id="contact" className="home-footer">
                <div className="home-content2">
                    <div className="home-details3">
                        <h2 className="home-title4">SMART-EMS</h2>
                        <p className="home-description3">
                            SMART-EMS is the ultimate solution for efficiently and effectively managing your
                            organization's equipment and allocating
                            the resources you need to enhance your studies and researches, more efficiently and
                            effectively.<br></br> Contact us if you want to know more about us!
                        </p>
                    </div>
                    <div className="home-socials">
                        <img
                            alt="image"
                            src="/playground_assets/linkedin.svg"
                            className="social"
                        />
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="home-link4"
                        >
                            <img
                                alt="image"
                                src="/playground_assets/instagram.svg"
                                className="home-image08 social"
                            />
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="home-link5"
                        >
                            <img
                                alt="image"
                                src="/playground_assets/twitter.svg"
                                className="home-image09 social"
                            />
                        </a>
                    </div>
                    <span className="home-copyright">
            Privacy — Terms &amp; Conditions — Code of Conduct © 2022 SMART-EMS All
            Rights Reserved
          </span>
                </div>
            </footer>
        </div>
    )
}

export default Home
