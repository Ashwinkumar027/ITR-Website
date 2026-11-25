import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { submitForm } from "../api";
import { handleSaveAndExit } from "../utils/navigation";

const Section11 = () => {
    const navigate = useNavigate();
    const { form, files, setField, setFile, resetForm } = useForm();
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (fieldName, value, checked) => {
        const currentValues = form[fieldName] || [];
        if (checked) {
            setField(fieldName, [...currentValues, value]);
        } else {
            setField(fieldName, currentValues.filter(item => item !== value));
        }
    };

    const validate = () => {
        if (!form.businessIncome)
            return "Please select business income status";

        // Business-related questions only if business income is yes
        if (form.businessIncome === "yes") {
            if (!form.businessNature || !form.businessNature.trim())
                return "Please enter nature of business / profession";

            if (!form.gstAvailable)
                return "Please select GSTIN availability";
        }

        if (!form.capitalGains || form.capitalGains.length === 0)
            return "Please select at least one capital gains option";

        if (!form.otherIncome || form.otherIncome.length === 0)
            return "Please select at least one income from other sources";

        if (!form.foreignAssets)
            return "Please select foreign assets status";

        if (!form.otherDemat)
            return "Please select DEMAT account status";

        if (!form.cashDeposit)
            return "Please select cash deposit information";

        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) return alert(err);

        try {
            setLoading(true);
            const data = await submitForm(form, files);
            console.log("✅ Form saved with ID:", data.formId || data.doc_name);
            resetForm();
            navigate("/success/" + (data.formId || data.doc_name));
        } catch (e) {
            console.error("❌ Submission error:", e);
            alert("Error: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormLayout title="Other Income Details" step={11}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>Final information</h4>
                    <p>
                        Provide remaining income details before submitting your ITR
                        information.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>11 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Status</span>
                            <strong>Final</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Review before submitting</li>
                        <li>Uploads are optional</li>
                        <li>Data is securely stored</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM */}
                <section className="form-content">

                    {/* BUSINESS INCOME */}
                    <div className="form-group">
                        <label className="form-label">
                            Do you have any business income? <span>*</span>
                        </label>
                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.businessIncome === "yes" ? "active" : ""}`}
                                onClick={() => setField("businessIncome", "yes")}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${form.businessIncome === "no" ? "active" : ""}`}
                                onClick={() => setField("businessIncome", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* BUSINESS-RELATED QUESTIONS - Only show if business income is yes */}
                    {form.businessIncome === "yes" && (
                        <>
                            {/* NATURE */}
                            <div className="form-group">
                                <label className="form-label">
                                    Nature of business / profession <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Eg: Trading, Consultancy, Freelancing"
                                    value={form.businessNature || ""}
                                    onChange={(e) => setField("businessNature", e.target.value)}
                                />
                            </div>

                            {/* GST */}
                            <div className="form-group">
                                <label className="form-label">
                                    Is GSTIN available? <span>*</span>
                                </label>
                                <div className="choice-group">
                                    <button
                                        type="button"
                                        className={`choice-btn ${form.gstAvailable === "yes" ? "active" : ""}`}
                                        onClick={() => setField("gstAvailable", "yes")}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        className={`choice-btn ${form.gstAvailable === "no" ? "active" : ""}`}
                                        onClick={() => setField("gstAvailable", "no")}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* CAPITAL GAINS */}
                    <div className="form-group">
                        <label className="form-label">
                            Income from capital gains <span>*</span>
                        </label>
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("stocks")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "stocks", e.target.checked)}
                                />
                                <span>Stocks</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("bonds")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "bonds", e.target.checked)}
                                />
                                <span>Bonds</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("mutual-funds")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "mutual-funds", e.target.checked)}
                                />
                                <span>Mutual Funds</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("land-building")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "land-building", e.target.checked)}
                                />
                                <span>Land & Building</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("others")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "others", e.target.checked)}
                                />
                                <span>Others</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.capitalGains || []).includes("none")}
                                    onChange={(e) => handleCheckboxChange("capitalGains", "none", e.target.checked)}
                                />
                                <span>No capital gains</span>
                            </label>
                        </div>
                    </div>

                    {/* OTHER INCOME */}
                    <div className="form-group">
                        <label className="form-label">
                            Income from other sources <span>*</span>
                        </label>
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.otherIncome || []).includes("interest")}
                                    onChange={(e) => handleCheckboxChange("otherIncome", "interest", e.target.checked)}
                                />
                                <span>Interest income</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.otherIncome || []).includes("dividends")}
                                    onChange={(e) => handleCheckboxChange("otherIncome", "dividends", e.target.checked)}
                                />
                                <span>Dividend income</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.otherIncome || []).includes("other")}
                                    onChange={(e) => handleCheckboxChange("otherIncome", "other", e.target.checked)}
                                />
                                <span>Other sources</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={(form.otherIncome || []).includes("none")}
                                    onChange={(e) => handleCheckboxChange("otherIncome", "none", e.target.checked)}
                                />
                                <span>No other income</span>
                            </label>
                        </div>
                    </div>

                    {/* FOREIGN ASSETS */}
                    <div className="form-group">
                        <label className="form-label">
                            Do you have foreign assets / income? <span>*</span>
                        </label>
                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.foreignAssets === "yes" ? "active" : ""}`}
                                onClick={() => setField("foreignAssets", "yes")}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${form.foreignAssets === "no" ? "active" : ""}`}
                                onClick={() => setField("foreignAssets", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* DEMAT */}
                    <div className="form-group">
                        <label className="form-label">
                            Do you have a DEMAT account other than Aionion Capital? <span>*</span>
                        </label>
                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.otherDemat === "yes" ? "active" : ""}`}
                                onClick={() => setField("otherDemat", "yes")}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${form.otherDemat === "no" ? "active" : ""}`}
                                onClick={() => setField("otherDemat", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* CASH */}
                    <div className="form-group">
                        <label className="form-label">
                            Cash deposited during FY 2025–26 <span>*</span>
                        </label>
                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.cashDeposit === "<10" ? "active" : ""}`}
                                onClick={() => setField("cashDeposit", "<10")}
                            >
                                Less than 10 Lakhs
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${form.cashDeposit === ">10" ? "active" : ""}`}
                                onClick={() => setField("cashDeposit", ">10")}
                            >
                                More than 10 Lakhs
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${form.cashDeposit === "na" ? "active" : ""}`}
                                onClick={() => setField("cashDeposit", "na")}
                            >
                                Not Applicable
                            </button>
                        </div>
                    </div>

                    {/* DEMAT UPLOAD */}
                    <div className="form-group">
                        <label className="form-label">
                            Upload DEMAT Statement (optional)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.xlsx,.csv,.jpg,.png"
                            onChange={(e) => setFile("dematFile", e.target.files[0])}
                        />
                    </div>

                    {/* ACTION */}
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

                        <button
                            className="primary-btn"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>

                </section>
            </div>
        </FormLayout>
    );
};

export default Section11;
