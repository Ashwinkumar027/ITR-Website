import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ITRSuccess.css";

const ITRSuccess = () => {
    const { submissionId } = useParams();
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="success-container">
            <div className="success-card">
                {/* Animated Success Icon */}
                <div className="success-icon-wrapper">
                    <svg className="animated-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="animated-check__circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="animated-check__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>

                <div className="success-badge">
                    <span>✨</span> Submission ID: {submissionId || "Pending"}
                </div>

                <h1 className="success-title">Submission Successful!</h1>

                <div className="info-highlight">
                    <h2 className="info-title">Your ITR Information Has Been Received</h2>
                    <p className="info-text">
                        Thank you for choosing <strong>Aionion Advisory</strong>.
                        We've received your filing details. Our tax experts will begin reviewing
                        your documents shortly.
                    </p>
                    <div className="status-chip">
                        <span>📧</span> Expect an update within 24-48 hours
                    </div>
                </div>

                <div className="next-steps-grid">
                    <div className="step-item">
                        <div className="step-icon">01</div>
                        <div className="step-content">
                            <strong>Expert Verification</strong>
                            <span>A dedicated chartered accountant will verify every detail.</span>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-icon">02</div>
                        <div className="step-content">
                            <strong>Document Preparation</strong>
                            <span>We'll draft your final return and ensure maximum tax savings.</span>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-icon">03</div>
                        <div className="step-content">
                            <strong>Final Confirmation</strong>
                            <span>You'll receive a copy of your filed ITR-V via WhatsApp & Email.</span>
                        </div>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to="/" className="btn-premium btn-primary-premium">
                        Return to Home
                    </Link>
                    <a
                        href="https://wa.me/919446416175"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium btn-secondary-premium"
                    >
                        💬 Chat with Support
                    </a>
                </div>

                <div className="footer-support">
                    Questions? Email us at{" "}
                    <a href="mailto:support@angassociates.com" className="footer-link">
                        support@angassociates.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ITRSuccess;

