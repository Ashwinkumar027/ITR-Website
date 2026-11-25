import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

/* Country codes as per PDF */
const COUNTRY_CODES = [
    { code: "+91", label: "IN India (+91)", min: 10, max: 10 },
    { code: "+1", label: "USA / Canada (+1)", min: 10, max: 10 },
    { code: "+44", label: "UK (+44)", min: 10, max: 11 },
    { code: "+61", label: "Australia (+61)", min: 9, max: 9 },
    { code: "+65", label: "Singapore (+65)", min: 8, max: 8 },
    { code: "+971", label: "UAE (+971)", min: 9, max: 9 },
    { code: "+966", label: "Saudi Arabia (+966)", min: 9, max: 9 },
    { code: "+974", label: "Qatar (+974)", min: 8, max: 8 },
    { code: "+965", label: "Kuwait (+965)", min: 8, max: 8 },
    { code: "+968", label: "Oman (+968)", min: 8, max: 8 },
    { code: "+973", label: "Bahrain (+973)", min: 8, max: 8 },
    { code: "+962", label: "Jordan (+962)", min: 9, max: 9 },
    { code: "+880", label: "Bangladesh (+880)", min: 10, max: 10 },
    { code: "+81", label: "Japan (+81)", min: 10, max: 10 },
    { code: "+49", label: "Germany (+49)", min: 10, max: 11 },
    { code: "+33", label: "France (+33)", min: 9, max: 9 },
    { code: "+other", label: "Other", min: 6, max: 15 }
];

const Section1 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();

    /* Validation */
    const validate = () => {
        if (!form.interestedInService)
            return "Please select Yes or No";

        if (!form.fullName || !form.fullName.trim())
            return "Please enter your full name";

        if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
            return "Please enter a valid email address";

        if (!form.taxYear)
            return "Please select a Tax Year";

        if (!form.annualIncome || isNaN(form.annualIncome))
            return "Please enter your approximate Annual Income";

        if (!form.country_code)
            return "Please select country code";

        if (form.country_code === "+other" && (!form.custom_country_code || !form.custom_country_code.trim()))
            return "Please enter custom country code";

        if (!form.mobileNumber)
            return "Please enter mobile number";

        const selected = COUNTRY_CODES.find(
            c => c.code === form.country_code
        );

        if (selected && form.country_code !== "+other") {
            if (
                form.mobileNumber.length < selected.min ||
                form.mobileNumber.length > selected.max
            ) {
                return `Mobile number must be ${selected.min}–${selected.max} digits`;
            }
        } else if (form.country_code === "+other") {
            // For custom country codes, basic validation
            if (form.mobileNumber.length < 6 || form.mobileNumber.length > 15) {
                return "Mobile number must be 6–15 digits for custom country codes";
            }
        }

        return null;
    };

    /* Navigation based on PDF */
    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        if (form.interestedInService === "yes") {
            navigate("/section-3"); // PDF flow
        } else {
            navigate("/section-2"); // Exit flow
        }
    };



    return (
        <FormLayout title="Basic Details" step={1}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>Basic details overview</h4>
                    <p>
                        Help us start your ITR filing with accurate contact information.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>1 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Est. time</span>
                            <strong>5–7 mins</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Use one form per PAN holder</li>
                        <li>Email & mobile should be active</li>
                        <li>Your data is secure & confidential</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM */}
                <section className="form-content">

                    {/* Guidelines */}
                    <div className="guidelines-box">
                        <h4>Please read before you continue</h4>
                        <p>
                            <strong>No duplicate submissions:</strong>
                            If you already submitted your PAN, no need to resubmit.
                        </p>
                        <p>
                            <strong>Multiple PANs welcome:</strong>
                            Same email can be used for family members.
                        </p>
                        <p>
                            <strong>Penalty for ITR-1 & ITR-2:</strong>
                            Late filing penalty of ₹1,000–₹5,000 applies as per Income Tax Department rules.
                        </p>
                        <p>
                            <strong>No penalty for Business/Profession filers:</strong>
                            No penalty applicable if filing under ITR-3 or ITR-4.
                        </p>
                    </div>

                    {/* Interest */}
                    <div className="form-group">
                        <label className="form-label">
                            Are you interested in Income Tax filing services? <span>*</span>
                        </label>

                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.interestedInService === "yes" ? "active" : ""}`}
                                onClick={() => setField("interestedInService", "yes")}
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                className={`choice-btn ${form.interestedInService === "no" ? "active" : ""}`}
                                onClick={() => setField("interestedInService", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="form-group">
                        <label className="form-label">
                            Full Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={form.fullName || ""}
                            onChange={(e) => setField("fullName", e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">
                            Email Address <span>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="We'll send your ITR updates here"
                            value={form.email || ""}
                            onChange={(e) => setField("email", e.target.value)}
                        />
                    </div>

                    {/* Tax Year & Income */}
                    <div className="contact-row">
                        <div className="form-group">
                            <label className="form-label">
                                Tax Year <span>*</span>
                            </label>
                            <input
                                type="text"
                                value={form.taxYear || "2025-26"}
                                readOnly
                                style={{ background: "#f8fafc", cursor: "not-allowed" }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Annual Income (Approx) <span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="eg: 500000"
                                value={form.annualIncome || ""}
                                onChange={(e) => setField("annualIncome", e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="form-group">
                        <label className="form-label">
                            Contact Number <span>*</span>
                        </label>

                        {form.country_code === "+other" ? (
                            <div className="contact-row">
                                <input
                                    type="text"
                                    placeholder="Country code (e.g. +123)"
                                    value={form.custom_country_code || ""}
                                    onChange={(e) => setField("custom_country_code", e.target.value)}
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={form.mobileNumber || ""}
                                    onChange={(e) =>
                                        setField("mobileNumber", e.target.value.replace(/\D/g, ""))
                                    }
                                />
                            </div>
                        ) : (
                            <div className="contact-row">
                                <select
                                    value={form.country_code || ""}
                                    onChange={(e) => setField("country_code", e.target.value)}
                                >
                                    <option value="">Select country</option>
                                    {COUNTRY_CODES.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={form.mobileNumber || ""}
                                    onChange={(e) =>
                                        setField("mobileNumber", e.target.value.replace(/\D/g, ""))
                                    }
                                />
                            </div>
                        )}

                        <small className="helper-text">
                            WhatsApp number preferred for quicker support
                        </small>
                    </div>

                    {/* Alternative WhatsApp Number */}
                    <div className="form-group">
                        <label className="form-label">
                            Alternative WhatsApp Number (if different)
                        </label>

                        {form.alt_country_code === "+other" ? (
                            <div className="contact-row">
                                <input
                                    type="text"
                                    placeholder="Country code (e.g. +123)"
                                    value={form.alt_custom_country_code || ""}
                                    onChange={(e) => setField("alt_custom_country_code", e.target.value)}
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter alternative WhatsApp number"
                                    value={form.altMobileNumber || ""}
                                    onChange={(e) =>
                                        setField("altMobileNumber", e.target.value.replace(/\D/g, ""))
                                    }
                                />
                            </div>
                        ) : (
                            <div className="contact-row">
                                <select
                                    value={form.alt_country_code || ""}
                                    onChange={(e) => setField("alt_country_code", e.target.value)}
                                >
                                    <option value="">Select country</option>
                                    {COUNTRY_CODES.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="tel"
                                    placeholder="Enter alternative WhatsApp number"
                                    value={form.altMobileNumber || ""}
                                    onChange={(e) =>
                                        setField("altMobileNumber", e.target.value.replace(/\D/g, ""))
                                    }
                                />
                            </div>
                        )}

                        <small className="helper-text">
                            For NRI clients with different WhatsApp numbers
                        </small>
                    </div>

                    {/* Actions */}
                    <div className="action-row">
                        <button className="secondary-btn" type="button" onClick={handleSaveAndExit}>
                            Save & exit
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

export default Section1;
