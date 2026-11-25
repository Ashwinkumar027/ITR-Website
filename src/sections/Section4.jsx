import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { submitForm } from "../api";
import { handleSaveAndExit } from "../utils/navigation";

const Section4 = () => {
    const navigate = useNavigate();
    const { form, files, setField, resetForm } = useForm();
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!form.registeredOnIncomeTax) {
            return "Please select whether you are registered on the Income Tax site";
        }

        // Only validate password sharing if registered
        if (form.registeredOnIncomeTax === "yes" && !form.sharePassword) {
            return "Please select whether you are willing to share your ITR password";
        }

        return null;
    };

    // Submit form data to backend (for "No" option)
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await submitForm(form, files);
            console.log("✅ Form saved with ID:", data.formId);
            resetForm();
            navigate("/success");
        } catch (e) {
            console.error("Submission error:", e);
            alert("Error: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        // If not registered, skip password section and go to Section 5
        if (form.registeredOnIncomeTax === "no") {
            navigate("/section-5");
            return;
        }

        // If "Not Applicable" - skip to Section 6
        if (form.sharePassword === "na") {
            navigate("/section-6");
            return;
        }

        // If "No" - submit the form (handled by submit button)
        if (form.sharePassword === "no") {
            return; // Submit button will handle this
        }

        // If "Yes" - go to password entry
        navigate("/section-5");
    };

    return (
        <FormLayout title="Income Tax Return Information" step={4}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>ITR access details</h4>
                    <p>
                        These details help us understand your access to the Income Tax
                        portal for filing your return.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>4 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Required</span>
                            <strong>Mandatory</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>No documents required</li>
                        <li>Only yes / no selections</li>
                        <li>Used only for filing process</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@anshulguptaassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM */}
                <section className="form-content">

                    {/* INFO BOX */}
                    <div className="guidelines-box">
                        <h4>Quick confirmation</h4>
                        <p>
                            Please answer the following questions so we can proceed with the
                            next steps of your ITR filing.
                        </p>
                    </div>

                    {/* QUESTION 1 */}
                    <div className="form-group">
                        <label className="form-label">
                            Are you already registered in Income Tax site? <span>*</span>
                        </label>

                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.registeredOnIncomeTax === "yes" ? "active" : ""
                                    }`}
                                onClick={() => setField("registeredOnIncomeTax", "yes")}
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                className={`choice-btn ${form.registeredOnIncomeTax === "no" ? "active" : ""
                                    }`}
                                onClick={() => setField("registeredOnIncomeTax", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* QUESTION 2 - Only show if registered */}
                    {form.registeredOnIncomeTax === "yes" && (
                        <div className="form-group">
                            <label className="form-label">
                                Are you willing to share your ITR password? <span>*</span>
                            </label>

                            <div className="choice-group">
                                <button
                                    type="button"
                                    className={`choice-btn ${form.sharePassword === "yes" ? "active" : ""
                                        }`}
                                    onClick={() => setField("sharePassword", "yes")}
                                >
                                    Yes
                                </button>

                                <button
                                    type="button"
                                    className={`choice-btn ${form.sharePassword === "no" ? "active" : ""
                                        }`}
                                    onClick={() => setField("sharePassword", "no")}
                                >
                                    No
                                </button>

                                <button
                                    type="button"
                                    className={`choice-btn ${form.sharePassword === "na" ? "active" : ""
                                        }`}
                                    onClick={() => setField("sharePassword", "na")}
                                >
                                    Not Applicable
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SUBMIT SECTION - Show only if "No" is selected for password sharing */}
                    {form.registeredOnIncomeTax === "yes" && form.sharePassword === "no" && (
                        <div className="guidelines-box" style={{
                            background: "linear-gradient(135deg, #fff1f1 0%, #ffe1e1 100%)",
                            borderColor: "#e63232",
                            marginTop: "20px"
                        }}>
                            <h4 style={{ color: "#d32424" }}>⚠️ Without password, we cannot file on your behalf</h4>
                            <p style={{ marginBottom: "16px" }}>
                                If you don't want to share your password, we'll save your details and
                                our team will contact you for alternative options.
                            </p>
                            <button
                                className="primary-btn"
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ width: "100%" }}
                            >
                                {loading ? "Submitting..." : "Submit & Finish"}
                            </button>
                        </div>
                    )}

                    {/* ACTIONS - Show only if NOT "No" for password sharing */}
                    {!(form.registeredOnIncomeTax === "yes" && form.sharePassword === "no") && (
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
                    )}

                    {/* Show Back button even when submit is shown */}
                    {form.registeredOnIncomeTax === "yes" && form.sharePassword === "no" && (
                        <div className="action-row" style={{ marginTop: "16px" }}>
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => navigate(-1)}
                            >
                                ← Back
                            </button>
                        </div>
                    )}

                </section>
            </div>
        </FormLayout>
    );
};

export default Section4;
