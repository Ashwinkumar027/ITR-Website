import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const Section3 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();
    const [panError, setPanError] = useState(false);

    const handlePanChange = (e) => {
        const rawValue = e.target.value;
        const upperValue = rawValue.toUpperCase();
        setField("pan_number", upperValue);

        // Position-based validation for PAN format: ABCDE1234F
        // Positions 1-5: Letters only
        // Positions 6-9: Numbers only
        // Position 10: Letter only

        if (rawValue.length === 0) {
            setPanError(false);
            return;
        }

        let hasError = false;

        for (let i = 0; i < rawValue.length && i < 10; i++) {
            const char = rawValue[i].toUpperCase();

            if (i < 5) {
                // Positions 1-5: Must be letters
                if (!/[A-Z]/.test(char)) {
                    hasError = true;
                    break;
                }
            } else if (i < 9) {
                // Positions 6-9: Must be numbers
                if (!/[0-9]/.test(char)) {
                    hasError = true;
                    break;
                }
            } else if (i === 9) {
                // Position 10: Must be letter
                if (!/[A-Z]/.test(char)) {
                    hasError = true;
                    break;
                }
            }
        }

        // Check for invalid characters anywhere
        if (/[^A-Za-z0-9]/.test(rawValue)) {
            hasError = true;
        }

        setPanError(hasError);
    };

    const validate = () => {
        if (!form.pan_number || !form.pan_number.trim()) {
            return "Please enter your PAN number";
        }

        if (!PAN_REGEX.test(form.pan_number)) {
            return "Please enter a valid PAN (Example: ABCDE1234F)";
        }

        if (!form.previouslyFiledWithAionion) {
            return "Please select Yes or No";
        }

        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        // ✅ PDF-based navigation
        if (form.previouslyFiledWithAionion === "yes") {
            navigate("/section-9");
        } else {
            navigate("/section-4");
        }
    };

    return (
        <FormLayout title="PAN Details" step={3}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>PAN details overview</h4>
                    <p>
                        Your Permanent Account Number (PAN) is required to file your Income
                        Tax Return.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>3 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Required</span>
                            <strong>Mandatory</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>PAN must be valid & active</li>
                        <li>One PAN per submission</li>
                        <li>Details are kept confidential</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM */}
                <section className="form-content">

                    {/* INFO BOX */}
                    <div className="guidelines-box">
                        <h4>Why we need your PAN</h4>
                        <p>
                            PAN is mandatory for filing Income Tax Returns and linking all
                            income and tax-related information.
                        </p>
                    </div>

                    {/* PAN NUMBER */}
                    <div className="form-group">
                        <label className="form-label">
                            PAN Number <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="ABCDE1234F"
                            value={form.pan_number || ""}
                            maxLength={10}
                            className={panError ? "error" : ""}
                            onChange={handlePanChange}
                        />
                        <small className="helper-text">
                            Enter PAN in capital letters (Format: ABCDE1234F)
                        </small>
                    </div>

                    {/* PREVIOUSLY FILED */}
                    <div className="form-group">
                        <label className="form-label">
                            Have you previously filed your return with Aionion? <span>*</span>
                        </label>

                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.previouslyFiledWithAionion === "yes" ? "active" : ""
                                    }`}
                                onClick={() =>
                                    setField("previouslyFiledWithAionion", "yes")
                                }
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                className={`choice-btn ${form.previouslyFiledWithAionion === "no" ? "active" : ""
                                    }`}
                                onClick={() =>
                                    setField("previouslyFiledWithAionion", "no")
                                }
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* ACTIONS */}
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
                            Next step →
                        </button>
                    </div>

                </section>
            </div>
        </FormLayout>
    );
};

export default Section3;
