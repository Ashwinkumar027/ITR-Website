import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! Our team will contact you shortly to schedule your consultation.');
    };

    return (
        <div className="contact-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1 className="page-title">Ready to Elevate Your Financial Strategy?</h1>
                        <p className="page-subtitle">
                            Connect with our experts for a consultation tailored to your business goals.
                        </p>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-card">
                            <h2>Schedule a Consultation</h2>
                            <p className="form-intro">
                                Tell us about your business needs and our advisory team will get back to you with personalized solutions.
                            </p>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@company.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company Name</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your company name"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">Service Interested In</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a service area</option>
                                        <optgroup label="Taxation & Strategic Planning">
                                            <option value="direct-tax">Direct & Indirect Tax</option>
                                            <option value="international-tax">International Taxation</option>
                                            <option value="representation">Representation & Appeals</option>
                                        </optgroup>
                                        <optgroup label="Audit & Assurance">
                                            <option value="statutory-audit">Statutory Audits</option>
                                            <option value="internal-audit">Internal & Management Audits</option>
                                            <option value="due-diligence">Due Diligence</option>
                                        </optgroup>
                                        <optgroup label="Corporate Advisory">
                                            <option value="entity-registration">Entity Registration</option>
                                            <option value="governance">Corporate Governance</option>
                                            <option value="fema-rbi">FEMA & RBI Compliance</option>
                                        </optgroup>
                                        <option value="other">Other / Multiple Services</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Tell Us About Your Needs</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe your business challenges or specific requirements..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Request Consultation
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info">
                            <div className="info-card">
                                <h3>Our Office</h3>
                                <p className="office-intro">
                                    Visit us at our Chennai office or reach out through any of the channels below.
                                </p>

                                <div className="contact-methods">
                                    <div className="contact-method">
                                        <div className="method-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="12" cy="9" r="2.5" stroke="#0066FF" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="method-details">
                                            <h4>Location</h4>
                                            <p>
                                                <strong>AIONION BUSINESSES AND MANAGEMENT Services LLP</strong><br />
                                                4A, Shreshtha Anand Apartments<br />
                                                No. 15 Hanumantha Road, Chennai, Tamil Nadu, 600014<br />
                                                GST: 33ABHFA7535L1Z9
                                            </p>
                                        </div>
                                    </div>

                                    <div className="contact-method">
                                        <div className="method-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="method-details">
                                            <h4>Email</h4>
                                            <p>info@angassociates.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="excellence-card">
                                <h3>The Advisory Advantage</h3>
                                <ul className="advantage-list">
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Peer-Reviewed Firm</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>ICAI Certified</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Dedicated Account Manager</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Cloud-Based Solutions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
