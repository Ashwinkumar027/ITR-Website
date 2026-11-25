// src/components/FormLayout.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "./Progressbar";

const FormLayout = ({ title, desc, children, step, logo = "/logo.png" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="page">
            <div className="card">

                {/* Logo Section */}
                <div className="logo-section">
                    <img src={logo} alt="ITR Filing Logo" className="logo-image" />
                    <div className="brand-content">
                        <h1 className="brand-title">ITR Filing Portal</h1>
                        <span className="brand-subtitle">Aionion Advisory</span>
                    </div>
                </div>

                <div className="header-info">
                    <h2>Income Tax Return Filing — FY 2025-26</h2>
                    <p className="muted">Secure • Confidential • Professional</p>
                </div>

                <ProgressBar step={step} />

                <div className="section">
                    <div className="section-container">
                        <h2 className="section-heading">{title}</h2>
                        {desc && <p className="section-desc">{desc}</p>}

                        <div className="section-body">{children}</div>

                        <div className="nav-buttons">
                            {location.pathname !== "/" && location.pathname !== "/itr-filing" && (
                                <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FormLayout;
