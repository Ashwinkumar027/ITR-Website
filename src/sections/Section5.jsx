import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section5 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        if (!form.itPassword || form.itPassword.trim().length < 4) {
            return "Please enter your Income Tax site password";
        }
        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        // ✅ Always go to Section 6
        navigate("/section-6");
    };

    return (
        <FormLayout title="Income Tax Site Details" step={5}>
            <div className="form-layout">

                {/* LEFT INFO PANEL */}
                <aside className="sidebar">
                    <h4>Why we need this?</h4>
                    <p>
                        Your Income Tax site password helps us log in and file your return
                        accurately on your behalf.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>5 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Security</span>
                            <strong>Encrypted</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Password is securely stored</li>
                        <li>Used only for ITR filing</li>
                        <li>Never shared with anyone</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM PANEL */}
                <section className="form-content">

                    <div className="guidelines-box">
                        <h4>Secure information</h4>
                        <p>
                            Please share your Income Tax site password. This is mandatory to
                            proceed with filing your return.
                        </p>
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="form-group">
                        <label className="form-label">
                            Please share your Password for the Income Tax Site <span>*</span>
                        </label>

                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your Income Tax site password"
                                value={form.itPassword || ""}
                                onChange={(e) => setField("itPassword", e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>

                        <span className="helper-text">
                            Your password is encrypted and used only for filing your ITR.
                        </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="action-row">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleSaveAndExit}
                        >
                            Save & Exit
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>

                        <button className="primary-btn" onClick={handleNext}>
                            Continue →
                        </button>
                    </div>

                </section>
            </div>
        </FormLayout>
    );
};

export default Section5;
