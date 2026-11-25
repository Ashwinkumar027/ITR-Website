import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <img src="./logo.png" alt="Aionion Advisory" className="company-logo" />
                        <span className="brand-name">
                            <span className="brand-aionion">Aionion</span>
                            <span className="brand-advisory">Advisory</span>
                        </span>
                    </div>

                    <button
                        className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <Link
                                to="/"
                                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={`nav-link ${isActive('/services') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/itr-filing"
                                className="btn btn-primary btn-nav"
                                onClick={closeMobileMenu}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                File ITR
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
