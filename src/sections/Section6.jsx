import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section6 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();

    const validate = () => {
        if (!form.account_type) {
            return "Please select your account type";
        }
        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        // ✅ Navigation based on selection
        if (form.account_type === "Individual") {
            navigate("/section-7");
        } else if (form.account_type === "HUF") {
            navigate("/section-8");
        }
    };

    return (
        <FormLayout title="Account Type" step={6}>
            <div className="form-layout">

                {/* LEFT INFO PANEL */}
                <aside className="sidebar">
                    <h4>Choose account type</h4>
                    <p>
                        Select the type of account for which you are filing the Income Tax
                        Return.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>6 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Est. time</span>
                            <strong>1 min</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Choose carefully</li>
                        <li>Different details required</li>
                        <li>Affects filing process</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM PANEL */}
                <section className="form-content">

                    <div className="guidelines-box">
                        <h4>Account selection</h4>
                        <p>
                            Please choose the appropriate account type. This helps us collect
                            the correct information for filing your return.
                        </p>
                    </div>

                    {/* ACCOUNT TYPE SELECTION */}
                    <div className="form-group">
                        <label className="form-label">
                            Account Type <span>*</span>
                        </label>

                        <div className="radio-card-group">
                            <div
                                className={`radio-card ${form.account_type === "Individual" ? "active" : ""
                                    }`}
                                onClick={() => setField("account_type", "Individual")}
                            >
                                <input
                                    type="radio"
                                    checked={form.account_type === "Individual"}
                                    readOnly
                                />
                                <div>
                                    <strong>Individual</strong>
                                    <p>For salaried or self-employed individuals</p>
                                </div>
                            </div>

                            <div
                                className={`radio-card ${form.account_type === "HUF" ? "active" : ""
                                    }`}
                                onClick={() => setField("account_type", "HUF")}
                            >
                                <input
                                    type="radio"
                                    checked={form.account_type === "HUF"}
                                    readOnly
                                />
                                <div>
                                    <strong>HUF</strong>
                                    <p>For Hindu Undivided Family accounts</p>
                                </div>
                            </div>
                        </div>
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

export default Section6;
