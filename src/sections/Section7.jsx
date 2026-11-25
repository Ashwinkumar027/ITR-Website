import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section7 = () => {
    const navigate = useNavigate();
    const { form, setField, setFile } = useForm();

    const validate = () => {
        if (!form.pan_name) return "Enter Name as per PAN";
        if (!form.father_name) return "Enter Father Name";
        if (!form.gender) return "Select Gender";
        if (!form.aadhaar || !/^\d{12}$/.test(form.aadhaar))
            return "Enter valid 12 digit Aadhaar number";
        if (!form.aadhaar_name) return "Enter Name as per Aadhaar";
        if (!form.dob) return "Select Date of Birth";
        if (!form.comm_address) return "Enter Communication Address";
        if (!form.perm_address) return "Enter Permanent Address";
        const mobileVal = String(form.mobileNumber || "").trim();
        if (!mobileVal || mobileVal.length < 8)
            return "Please provide a valid 10-digit Mobile Number";
        if (!form.email || !/\S+@\S+\.\S/.test(form.email))
            return "Enter valid Email ID";

        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);

        navigate("/section-9");
    };

    return (
        <FormLayout title="Individual Account" step={7}>
            <div className="form-layout">

                {/* LEFT INFO */}
                <aside className="sidebar">
                    <h4>Individual Account</h4>
                    <p>
                        Provide details exactly as per PAN, Aadhaar and Bank records.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Step</span>
                            <strong>7 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Est. time</span>
                            <strong>5 mins</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Names must match official records</li>
                        <li>Aadhaar is mandatory</li>
                        <li>Bank proof required</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help?<br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* FORM */}
                <section className="form-content">

                    <div className="guidelines-box">
                        <h4>Please read carefully</h4>
                        <p>
                            Upload bank proof showing IFSC code, account number, branch name
                            and account type. Rename the file using your PAN number.
                        </p>
                    </div>



                    {/* PAN Name */}
                    <div className="form-group">
                        <label className="form-label">
                            Name as per PAN <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.pan_name || ""}
                            onChange={(e) => setField("pan_name", e.target.value)}
                        />
                    </div>

                    {/* Father Name */}
                    <div className="form-group">
                        <label className="form-label">
                            Father Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.father_name || ""}
                            onChange={(e) => setField("father_name", e.target.value)}
                        />
                    </div>

                    {/* Gender */}
                    <div className="form-group">
                        <label className="form-label">
                            Gender <span>*</span>
                        </label>
                        <div className="radio-card-group">
                            {["Male", "Female"].map((g) => (
                                <div
                                    key={g}
                                    className={`radio-card ${form.gender === g ? "active" : ""
                                        }`}
                                    onClick={() => setField("gender", g)}
                                >
                                    <input type="radio" checked={form.gender === g} readOnly />
                                    {g}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Aadhaar */}
                    <div className="form-group">
                        <label className="form-label">
                            Aadhaar Number <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="123456789012"
                            maxLength={12}
                            value={form.aadhaar || ""}
                            onChange={(e) =>
                                setField("aadhaar", e.target.value.replace(/\D/g, ""))
                            }
                        />
                        <small className="helper-text">
                            Enter 12-digit Aadhaar number (Format: 1234 5678 9012)
                        </small>
                    </div>

                    {/* Aadhaar Name */}
                    <div className="form-group">
                        <label className="form-label">
                            Name as per Aadhaar <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.aadhaar_name || ""}
                            onChange={(e) => setField("aadhaar_name", e.target.value)}
                        />
                    </div>

                    {/* DOB */}
                    <div className="form-group">
                        <label className="form-label">
                            Date of Birth <span>*</span>
                        </label>
                        <input
                            type="date"
                            value={form.dob || ""}
                            onChange={(e) => setField("dob", e.target.value)}
                        />
                    </div>

                    {/* Addresses */}
                    <div className="form-group">
                        <label className="form-label">
                            Communication Address <span>*</span>
                        </label>
                        <textarea
                            rows="3"
                            value={form.comm_address || ""}
                            onChange={(e) => setField("comm_address", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Permanent Address <span>*</span>
                        </label>
                        <textarea
                            rows="3"
                            value={form.perm_address || ""}
                            onChange={(e) => setField("perm_address", e.target.value)}
                        />
                    </div>

                    {/* Mobile */}
                    <div className="form-group">
                        <label className="form-label">
                            Mobile Number <span>*</span>
                        </label>
                        <input
                            type="tel"
                            value={form.mobileNumber || ""}
                            onChange={(e) =>
                                setField("mobileNumber", e.target.value.replace(/\D/g, ""))
                            }
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">
                            Email ID <span>*</span>
                        </label>
                        <input
                            type="email"
                            value={form.email || ""}
                            onChange={(e) => setField("email", e.target.value)}
                        />
                    </div>

                    {/* Bank Upload */}
                    <div className="form-group">
                        <label className="form-label">
                            Upload Bank Details (optional)
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFile("bankFile", e.target.files[0])}
                        />
                        <span className="helper-text">
                            Rename file using your PAN number.
                            If unable to upload, email to <b>support@angassociates.com</b>
                        </span>
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

export default Section7;
