import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section footer-brand">
                        <div className="footer-logo">
                            <img src="./logo.png" alt="Aionion Advisory" className="company-logo-footer" />
                            <span className="footer-brand-name">
                                <span className="footer-brand-aionion">Aionion</span>
                                <span className="footer-brand-advisory">Advisory</span>
                            </span>
                        </div>
                        <p className="footer-description">
                            Since 2026, a premier partner for businesses seeking clarity in taxation,
                            auditing, and corporate growth. We bridge the gap between complex regulations
                            and your commercial success.
                        </p>
                        <div className="footer-badges">
                            <span className="footer-badge">Peer-Reviewed Firm</span>
                            <span className="footer-badge">ICAI Certified</span>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Core Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Taxation & Strategic Planning</Link></li>
                            <li><Link to="/services">Audit & Assurance</Link></li>
                            <li><Link to="/services">Corporate Advisory</Link></li>
                            <li><Link to="/services">FEMA & RBI Compliance</Link></li>
                            <li><Link to="/itr-filing">Income Tax Filing</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/services">All Services</Link></li>
                            <li><Link to="/itr-filing">File ITR Online</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-contact">
                            <li>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>info@angassociates.com</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2C6.69 2 4 4.69 4 8C4 12.5 10 18 10 18C10 18 16 12.5 16 8C16 4.69 13.31 2 10 2Z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <span>
                                    <strong>AIONION BUSINESSES AND MANAGEMENT Services LLP</strong><br />
                                    4A, Shreshtha Anand Apartments<br />
                                    No. 15 Hanumantha Road, Chennai, Tamil Nadu, 600014<br />
                                    GST: 33ABHFA7535L1Z9
                                </span>
                            </li>
                        </ul>
                        <Link to="/itr-filing" className="footer-cta-btn" target="_blank" rel="noopener noreferrer">
                            File ITR
                        </Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-legal">
                        <Link to="#">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="#">Terms of Service</Link>
                    </div>
                    <p className="footer-copyright">© 2026 Aionion Advisory. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
