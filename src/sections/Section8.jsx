import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section8 = () => {
    const navigate = useNavigate();
    const { form, setField, setFile } = useForm();

    const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    const validate = () => {
        if (!form.huf_pan) return "Enter HUF PAN Number";
        if (!PAN_REGEX.test(form.huf_pan)) return "Enter valid HUF PAN (Example: ABCDE1234F)";
        if (!form.huf_pan_name) return "Enter Name as per HUF PAN";
        if (!form.huf_formation_date) return "Select HUF formation date";
        if (!form.huf_comm_address) return "Enter Communication Address";
        if (!form.huf_perm_address) return "Enter Permanent Address";

        if (!form.karta_pan) return "Enter PAN Number of Karta";
        if (!PAN_REGEX.test(form.karta_pan)) return "Enter valid Karta PAN (Example: ABCDE1234F)";
        if (!form.karta_name) return "Enter Name of Karta";
        if (!form.karta_father) return "Enter Father Name of Karta";
        if (!form.karta_gender) return "Select Gender of Karta";
        if (!form.karta_dob) return "Select DOB of Karta";

        const hufMobileVal = String(form.hufMobileNumber || "").trim();
        if (!hufMobileVal || hufMobileVal.length < 8)
            return "Please provide a valid 10-digit Mobile Number for HUF";
        if (!form.huf_email || !/\S+@\S+\.\S+/.test(form.huf_email))
            return "Enter valid Email ID";

        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);
        navigate("/section-9");
    };

    return (
        <FormLayout title="HUF Account" step={8}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>HUF Details</h4>
                    <p>
                        Enter details exactly as per HUF PAN, Karta PAN and Bank records.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Step</span>
                            <strong>8 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Est. time</span>
                            <strong>6–8 mins</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Karta details are mandatory</li>
                        <li>HUF & Karta PAN must be valid</li>
                        <li>Bank proof required</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help?<br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* FORM CONTENT */}
                <section className="form-content">

                    <div className="guidelines-box">
                        <h4>Please read carefully</h4>
                        <p>
                            Upload bank proof showing IFSC code, account number, branch name
                            and account type. Rename the file using your HUF PAN number.
                        </p>
                    </div>



                    {/* HUF PAN */}
                    <div className="form-group">
                        <label className="form-label">
                            PAN Number of HUF <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            value={form.huf_pan || ""}
                            onChange={(e) => setField("huf_pan", e.target.value.toUpperCase())}
                        />
                        <small className="helper-text">
                            Enter PAN in capital letters (Format: ABCDE1234F)
                        </small>
                    </div>

                    {/* HUF PAN Name */}
                    <div className="form-group">
                        <label className="form-label">
                            Name as per PAN <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.huf_pan_name || ""}
                            onChange={(e) => setField("huf_pan_name", e.target.value)}
                        />
                    </div>

                    {/* Formation Date */}
                    <div className="form-group">
                        <label className="form-label">
                            Date of formation as per HUF <span>*</span>
                        </label>
                        <input
                            type="date"
                            value={form.huf_formation_date || ""}
                            onChange={(e) =>
                                setField("huf_formation_date", e.target.value)
                            }
                        />
                    </div>

                    {/* Addresses */}
                    <div className="form-group">
                        <label className="form-label">
                            Communication Address <span>*</span>
                        </label>
                        <textarea
                            rows="3"
                            value={form.huf_comm_address || ""}
                            onChange={(e) =>
                                setField("huf_comm_address", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Permanent Address <span>*</span>
                        </label>
                        <textarea
                            rows="3"
                            value={form.huf_perm_address || ""}
                            onChange={(e) =>
                                setField("huf_perm_address", e.target.value)
                            }
                        />
                    </div>

                    {/* KARTA DETAILS */}
                    <h4 className="section-subtitle">Karta Details</h4>

                    <div className="form-group">
                        <label className="form-label">
                            PAN Number of Karta <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            value={form.karta_pan || ""}
                            onChange={(e) =>
                                setField("karta_pan", e.target.value.toUpperCase())
                            }
                        />
                        <small className="helper-text">
                            Enter PAN in capital letters (Format: ABCDE1234F)
                        </small>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Name of Karta <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.karta_name || ""}
                            onChange={(e) => setField("karta_name", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Father Name of Karta <span>*</span>
                        </label>
                        <input
                            type="text"
                            value={form.karta_father || ""}
                            onChange={(e) => setField("karta_father", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Gender of Karta <span>*</span>
                        </label>
                        <div className="radio-card-group">
                            {["Male", "Female"].map((g) => (
                                <div
                                    key={g}
                                    className={`radio-card ${form.karta_gender === g ? "active" : ""
                                        }`}
                                    onClick={() => setField("karta_gender", g)}
                                >
                                    <input type="radio" checked={form.karta_gender === g} readOnly />
                                    {g}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            DOB of Karta <span>*</span>
                        </label>
                        <input
                            type="date"
                            value={form.karta_dob || ""}
                            onChange={(e) => setField("karta_dob", e.target.value)}
                        />
                    </div>

                    {/* CONTACT */}
                    <div className="form-group">
                        <label className="form-label">
                            Mobile Number <span>*</span>
                        </label>
                        <input
                            type="tel"
                            value={form.hufMobileNumber || ""}
                            onChange={(e) =>
                                setField("hufMobileNumber", e.target.value.replace(/\D/g, ""))
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email ID <span>*</span>
                        </label>
                        <input
                            type="email"
                            value={form.huf_email || ""}
                            onChange={(e) => setField("huf_email", e.target.value)}
                        />
                    </div>

                    {/* BANK UPLOAD */}
                    <div className="form-group">
                        <label className="form-label">
                            Upload Bank Details (optional)
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setFile("hufBankFile", e.target.files[0])
                            }
                        />
                        <span className="helper-text">
                            Rename file using your HUF PAN number.
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

export default Section8;
