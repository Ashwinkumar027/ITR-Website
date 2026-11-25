import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section9 = () => {
    const navigate = useNavigate();
    const { form, files, setField, setFile } = useForm();

    const validate = () => {
        if (!form.is_resident) return "Please select Resident status";
        if (!form.has_salary) return "Please select Salary income option";

        if (form.has_salary === "yes") {
            if (!form.form16_available)
                return "Please select Form 16 availability";

            if (
                form.form16_available === "yes" &&
                !files.form16File
            ) {
                return "Please upload Form 16";
            }
        }
        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);
        navigate("/section-10");
    };

    return (
        <FormLayout title="Income Details" step={9}>
            <div className="form-layout">

                {/* LEFT INFO */}
                <aside className="sidebar">
                    <h4>Income Overview</h4>
                    <p>Provide details about your income sources for FY 2025-26.</p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Step</span>
                            <strong>9 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Est. time</span>
                            <strong>5–7 mins</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Salary income needs Form 16</li>
                        <li>Upload files clearly</li>
                        <li>Details must match IT records</li>
                    </ul>
                </aside>

                {/* FORM */}
                <section className="form-content">

                    {/* Resident */}
                    <div className="form-group">
                        <label className="form-label">
                            Are you an Indian Resident? <span>*</span>
                        </label>
                        <div className="radio-card-group">
                            {["yes", "no"].map((v) => (
                                <div
                                    key={v}
                                    className={`radio-card ${form.is_resident === v ? "active" : ""
                                        }`}
                                    onClick={() => setField("is_resident", v)}
                                >
                                    <input type="radio" checked={form.is_resident === v} readOnly />
                                    {v === "yes" ? "Yes" : "No"}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Salary */}
                    <div className="form-group">
                        <label className="form-label">
                            Do you have salary income? <span>*</span>
                        </label>
                        <div className="radio-card-group">
                            {["yes", "no"].map((v) => (
                                <div
                                    key={v}
                                    className={`radio-card ${form.has_salary === v ? "active" : ""
                                        }`}
                                    onClick={() => setField("has_salary", v)}
                                >
                                    <input type="radio" checked={form.has_salary === v} readOnly />
                                    {v === "yes" ? "Yes" : "No"}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form 16 Availability */}
                    {form.has_salary === "yes" && (
                        <div className="form-group">
                            <label className="form-label">
                                Do you have Form 16? <span>*</span>
                            </label>
                            <div className="radio-card-group">
                                {["yes", "no"].map((v) => (
                                    <div
                                        key={v}
                                        className={`radio-card ${form.form16_available === v ? "active" : ""
                                            }`}
                                        onClick={() => setField("form16_available", v)}
                                    >
                                        <input
                                            type="radio"
                                            checked={form.form16_available === v}
                                            readOnly
                                        />
                                        {v === "yes" ? "Yes" : "No"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Form 16 Not Available Prompt */}
                    {form.has_salary === "yes" && form.form16_available === "no" && (
                        <div className="guidelines-box">
                            <h4>Form 16 Required</h4>
                            <p>
                                Please send your Form 16 using email subject line: "Form 16 - [Your PAN Number]"
                                to <strong>support@angassociates.com</strong>
                            </p>
                            <p>
                                Alternatively, you can share it via WhatsApp at the contact number provided.
                            </p>
                        </div>
                    )}

                    {/* Upload Form 16 */}
                    {form.has_salary === "yes" &&
                        form.form16_available === "yes" && (
                            <div className="form-group">
                                <label className="form-label">
                                    Upload Form 16 <span>*</span>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setFile("form16File", e.target.files[0])
                                    }
                                />
                                <span className="helper-text">
                                    Rename file using your PAN number
                                </span>
                            </div>
                        )}

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
                            className="secondary-btn"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>

                        <button className="primary-btn" onClick={handleNext}>
                            Next →
                        </button>
                    </div>

                </section>
            </div>
        </FormLayout>
    );
};

export default Section9;
