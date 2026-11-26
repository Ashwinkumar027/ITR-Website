import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RMBadge from "../components/RMBadge";
import SalesRMSearch from "../components/SalesRMSearch";
import PreConfirmationModal from "../components/PreConfirmationModal";
import FileUploadWithPreview from "../components/FileUploadWithPreview";
import { submitServiceForm } from "../api";
import "./HUFForm.css";

const RELATIONSHIPS = ["Spouse", "Son", "Daughter", "Father", "Mother", "Coparcener", "Other"];
const MARITAL_STATUSES = ["Married", "Single", "Divorced", "Widowed"];

const HUFForm = () => {
    const navigate = useNavigate();

    // Step state (1: Karta & Firm, 2: Family Members, 3: Address & Contact)
    const [currentStep, setCurrentStep] = useState(1);
    const [salesRM, setSalesRM] = useState(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        kartaName: "",
        maritalStatus: "Married",
        dob: "",
        gender: "Male",
        pan: "",
        aadhaar: "",
        email: "",
        countryCode: "+91",
        mobileNumber: "",
        whatsappNumber: "",
        sameAsMobile: true,
        commAddress: "",
        permAddress: "",
        sameAsComm: true,
        familyMembers: [
            {
                name: "",
                relationship: "Spouse",
                dob: "",
                gender: "Female",
                isMinor: false,
                pan: "",
                aadhaar: ""
            }
        ]
    });

    // File attachments
    const [files, setFiles] = useState({
        karta_pan_attachment: null,
        karta_aadhaar_attachment: null
    });

    // Member files: keys like huf_pan_0, huf_aadhaar_0
    const [memberFiles, setMemberFiles] = useState({});

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Family Member Dynamic Handlers
    const addMember = () => {
        setFormData(prev => ({
            ...prev,
            familyMembers: [
                ...prev.familyMembers,
                { name: "", relationship: "Son", dob: "", gender: "Male", isMinor: false, pan: "", aadhaar: "" }
            ]
        }));
    };

    const removeMember = (index) => {
        if (formData.familyMembers.length <= 1) {
            alert("A HUF must have at least one family member besides the Karta.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            familyMembers: prev.familyMembers.filter((_, i) => i !== index)
        }));
    };

    const updateMember = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.familyMembers];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, familyMembers: updated };
        });
    };

    const handleMemberFileChange = (index, type, file) => {
        setMemberFiles(prev => ({
            ...prev,
            [`huf_${type}_${index}`]: file
        }));
    };

    // Step Validations
    const validateStep1 = () => {
        if (!formData.kartaName.trim()) return "Please enter Karta / Applicant full name.";
        if (!formData.maritalStatus) return "Please select marital status.";
        if (!formData.pan.trim() || formData.pan.length !== 10) return "Please enter a valid 10-character PAN.";
        if (!formData.aadhaar.trim() || formData.aadhaar.replace(/\D/g, "").length !== 12) return "Please enter a valid 12-digit Aadhaar number.";
        return null;
    };

    const validateStep2 = () => {
        for (let i = 0; i < formData.familyMembers.length; i++) {
            const m = formData.familyMembers[i];
            if (!m.name.trim()) return `Please enter name for Family Member #${i + 1}.`;
            if (!m.isMinor && (!m.pan || m.pan.trim().length !== 10)) {
                return `Please enter a valid PAN for ${m.name || `Member #${i + 1}`} (or check 'Minor' if child under 18).`;
            }
            if (!m.aadhaar || m.aadhaar.replace(/\D/g, "").length !== 12) {
                return `Please enter a valid 12-digit Aadhaar for ${m.name || `Member #${i + 1}`}.`;
            }
        }
        return null;
    };

    const validateStep3 = () => {
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address.";
        if (!formData.mobileNumber.trim() || formData.mobileNumber.replace(/\D/g, "").length < 10) return "Please enter a valid 10-digit mobile number.";
        if (!formData.commAddress.trim()) return "Please enter your communication address.";
        return null;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            const err = validateStep1();
            if (err) return alert(err);
            setCurrentStep(2);
            window.scrollTo(0, 0);
        } else if (currentStep === 2) {
            const err = validateStep2();
            if (err) return alert(err);
            setCurrentStep(3);
            window.scrollTo(0, 0);
        } else if (currentStep === 3) {
            const err = validateStep3();
            if (err) return alert(err);
            setIsReviewOpen(true);
        }
    };

    // Final Submit Handler
    const handleFinalSubmit = async () => {
        try {
            setLoading(true);

            // Construct payload matching Frappe submit_itr_details schema
            const payload = {
                service_type: "HUF Creation",
                account_type: "HUF",
                fullName: formData.kartaName,
                karta_name: formData.kartaName,
                marital_status: formData.maritalStatus,
                pan_number: formData.pan.toUpperCase(),
                aadhaar: formData.aadhaar,
                gender: formData.gender,
                dob: formData.dob,
                email: formData.email,
                country_code: formData.countryCode,
                mobileNumber: formData.mobileNumber,
                altMobileNumber: formData.sameAsMobile ? formData.mobileNumber : formData.whatsappNumber,
                communicationAddress: formData.commAddress,
                permanentAddress: formData.sameAsComm ? formData.commAddress : formData.permAddress,
                sales_rm: salesRM ? salesRM.user : "",
                sales_rm_name: salesRM ? salesRM.full_name : "",
                family_members: formData.familyMembers.map(m => ({
                    member_name: m.name,
                    relationship: m.relationship,
                    dob: m.dob,
                    gender: m.gender,
                    is_minor: m.isMinor ? 1 : 0,
                    pan: (m.pan || "").toUpperCase(),
                    aadhaar: m.aadhaar
                }))
            };

            // Combine all files
            const allFiles = {
                ...files,
                ...memberFiles
            };

            const res = await submitServiceForm(payload, allFiles);
            setIsReviewOpen(false);
            navigate(`/success/${res.formId || res.doc_name}`);
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Submission error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const countAttachedFiles = () => {
        let count = 0;
        if (files.karta_pan_attachment) count++;
        if (files.karta_aadhaar_attachment) count++;
        count += Object.values(memberFiles).filter(f => f != null).length;
        return count;
    };

    return (
        <div className="huf-page-container">
            <div className="huf-card">
                {/* Header Section */}
                <div className="huf-header">
                    <Link to="/services" className="huf-back-link">← All Services</Link>
                    <div className="huf-header-content">
                        <span className="huf-service-tag">Entity & Tax Setup</span>
                        <h1 className="huf-title">HUF Creation Application</h1>
                        <p className="huf-subtitle">
                            Establish a Hindu Undivided Family tax entity with deed drafting, PAN application, and complete CA guidance.
                        </p>
                    </div>
                </div>

                {/* Live Desk Badge */}
                <RMBadge rmName="Priya" subtitle="Aionion Corporate Tax & Advisory Desk" />

                {/* Progress Tracker */}
                <div className="huf-stepper">
                    <div className={`step-node ${currentStep >= 1 ? "active" : ""}`}>
                        <div className="step-num">1</div>
                        <span className="step-label">Karta & Sales RM</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-node ${currentStep >= 2 ? "active" : ""}`}>
                        <div className="step-num">2</div>
                        <span className="step-label">Family Members</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-node ${currentStep >= 3 ? "active" : ""}`}>
                        <div className="step-num">3</div>
                        <span className="step-label">Contact & Address</span>
                    </div>
                </div>

                {/* STEP 1: Karta & Identity */}
                {currentStep === 1 && (
                    <div className="form-step-section">
                        <h3 className="section-title">Step 1: Karta (Head of Family) & Identity</h3>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Karta Full Name (Applicant) <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter Karta's full legal name"
                                    value={formData.kartaName}
                                    onChange={(e) => updateField("kartaName", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Marital Status <span>*</span></label>
                                <select
                                    value={formData.maritalStatus}
                                    onChange={(e) => updateField("maritalStatus", e.target.value)}
                                >
                                    {MARITAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Karta PAN Number <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. ABCDE1234F"
                                    maxLength={10}
                                    value={formData.pan}
                                    onChange={(e) => updateField("pan", e.target.value.toUpperCase())}
                                />
                            </div>

                            <div className="form-group">
                                <label>Karta Aadhaar Number <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="12-digit Aadhaar number"
                                    maxLength={12}
                                    value={formData.aadhaar}
                                    onChange={(e) => updateField("aadhaar", e.target.value.replace(/\D/g, ""))}
                                />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => updateField("dob", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => updateField("gender", e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Document Uploads with Instant Preview */}
                        <div className="doc-upload-box">
                            <h4 className="doc-upload-title">Karta Document Attachments (with Interactive Preview)</h4>
                            <div className="form-grid-2">
                                <FileUploadWithPreview
                                    label="Upload Karta PAN Card"
                                    file={files.karta_pan_attachment}
                                    onChange={(file) => setFiles(prev => ({ ...prev, karta_pan_attachment: file }))}
                                    id="karta-pan-upload"
                                />

                                <FileUploadWithPreview
                                    label="Upload Karta Aadhaar Card"
                                    file={files.karta_aadhaar_attachment}
                                    onChange={(file) => setFiles(prev => ({ ...prev, karta_aadhaar_attachment: file }))}
                                    id="karta-aadhaar-upload"
                                />
                            </div>
                        </div>

                        {/* Dynamic Sales RM Search Dropdown */}
                        <SalesRMSearch selectedRM={salesRM} onSelectRM={setSalesRM} />

                        <div className="form-actions-row">
                            <div></div>
                            <button type="button" className="btn-primary-action" onClick={handleNext}>
                                Continue to Family Members →
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: Family Members Dynamic Builder */}
                {currentStep === 2 && (
                    <div className="form-step-section">
                        <div className="step-header-flex">
                            <div>
                                <h3 className="section-title">Step 2: Family Members (Coparceners)</h3>
                                <p className="section-desc">Add family members included in the HUF constitution deed.</p>
                            </div>
                            <button type="button" className="btn-add-member" onClick={addMember}>
                                + Add Member
                            </button>
                        </div>

                        {formData.familyMembers.map((member, index) => (
                            <div key={index} className="member-card-row">
                                <div className="member-card-header">
                                    <span className="member-badge">Member #{index + 1}</span>
                                    {formData.familyMembers.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn-remove-member"
                                            onClick={() => removeMember(index)}
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>

                                <div className="form-grid-3">
                                    <div className="form-group">
                                        <label>Member Full Name <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Member name"
                                            value={member.name}
                                            onChange={(e) => updateMember(index, "name", e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Relationship with Karta <span>*</span></label>
                                        <select
                                            value={member.relationship}
                                            onChange={(e) => updateMember(index, "relationship", e.target.value)}
                                        >
                                            {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            value={member.dob}
                                            onChange={(e) => updateMember(index, "dob", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid-3">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select
                                            value={member.gender}
                                            onChange={(e) => updateMember(index, "gender", e.target.value)}
                                        >
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            PAN Number {!member.isMinor && <span>*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={member.isMinor ? "Optional if minor" : "10-digit PAN"}
                                            maxLength={10}
                                            value={member.pan}
                                            onChange={(e) => updateMember(index, "pan", e.target.value.toUpperCase())}
                                        />
                                        <label className="checkbox-sub">
                                            <input
                                                type="checkbox"
                                                checked={member.isMinor}
                                                onChange={(e) => updateMember(index, "isMinor", e.target.checked)}
                                            />
                                            <span>Minor child (under 18)</span>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label>Aadhaar Number <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="12-digit Aadhaar"
                                            maxLength={12}
                                            value={member.aadhaar}
                                            onChange={(e) => updateMember(index, "aadhaar", e.target.value.replace(/\D/g, ""))}
                                        />
                                    </div>
                                </div>

                                {/* Per-member uploads with Interactive Preview */}
                                <div className="member-upload-row">
                                    <div className="member-upload-col">
                                        <FileUploadWithPreview
                                            label={`Member ${index + 1} PAN Copy`}
                                            file={memberFiles[`huf_pan_${index}`] || null}
                                            onChange={(file) => handleMemberFileChange(index, "pan", file)}
                                            id={`member-pan-${index}`}
                                        />
                                    </div>
                                    <div className="member-upload-col">
                                        <FileUploadWithPreview
                                            label={`Member ${index + 1} Aadhaar Copy`}
                                            file={memberFiles[`huf_aadhaar_${index}`] || null}
                                            onChange={(file) => handleMemberFileChange(index, "aadhaar", file)}
                                            id={`member-aadhaar-${index}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="form-actions-row">
                            <button type="button" className="btn-secondary-action" onClick={() => setCurrentStep(1)}>
                                ← Back to Karta
                            </button>
                            <button type="button" className="btn-primary-action" onClick={handleNext}>
                                Continue to Contact & Address →
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: Contact & Address */}
                {currentStep === 3 && (
                    <div className="form-step-section">
                        <h3 className="section-title">Step 3: Contact Details & Official Address</h3>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    placeholder="e.g. karta@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Contact Mobile Number <span>*</span></label>
                                <div className="phone-input-row">
                                    <select
                                        className="country-select"
                                        value={formData.countryCode}
                                        onChange={(e) => updateField("countryCode", e.target.value)}
                                    >
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+1">+1 (USA/CA)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+971">+971 (UAE)</option>
                                        <option value="+65">+65 (SG)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        value={formData.mobileNumber}
                                        onChange={(e) => updateField("mobileNumber", e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-sub">
                                <input
                                    type="checkbox"
                                    checked={formData.sameAsMobile}
                                    onChange={(e) => updateField("sameAsMobile", e.target.checked)}
                                />
                                <span>WhatsApp number is the same as contact mobile</span>
                            </label>
                            {!formData.sameAsMobile && (
                                <input
                                    type="tel"
                                    placeholder="Enter WhatsApp mobile number"
                                    className="mt-2"
                                    value={formData.whatsappNumber}
                                    onChange={(e) => updateField("whatsappNumber", e.target.value.replace(/\D/g, ""))}
                                />
                            )}
                        </div>

                        {/* Communication Address */}
                        <div className="form-group">
                            <label>Communication Address <span>*</span></label>
                            <textarea
                                rows={2}
                                placeholder="Door/Flat No, Street, Area, City, State, PIN Code"
                                value={formData.commAddress}
                                onChange={(e) => updateField("commAddress", e.target.value)}
                            />
                        </div>

                        {/* Permanent Address */}
                        <div className="form-group">
                            <label className="checkbox-sub">
                                <input
                                    type="checkbox"
                                    checked={formData.sameAsComm}
                                    onChange={(e) => updateField("sameAsComm", e.target.checked)}
                                />
                                <span>Permanent address is the same as communication address</span>
                            </label>
                            {!formData.sameAsComm && (
                                <textarea
                                    rows={2}
                                    placeholder="Enter Permanent Address"
                                    className="mt-2"
                                    value={formData.permAddress}
                                    onChange={(e) => updateField("permAddress", e.target.value)}
                                />
                            )}
                        </div>

                        <div className="form-actions-row">
                            <button type="button" className="btn-secondary-action" onClick={() => setCurrentStep(2)}>
                                ← Back to Members
                            </button>
                            <button type="button" className="btn-primary-action" onClick={handleNext}>
                                Review & Submit Application →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Pre-Confirmation Review Modal */}
            <PreConfirmationModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onConfirm={handleFinalSubmit}
                serviceTitle="HUF Creation"
                applicantData={{
                    fullName: formData.kartaName,
                    maritalStatus: formData.maritalStatus,
                    pan: formData.pan,
                    email: formData.email,
                    mobile: formData.mobileNumber,
                    country_code: formData.countryCode
                }}
                members={formData.familyMembers}
                filesCount={countAttachedFiles()}
                salesRM={salesRM}
                loading={loading}
            />
        </div>
    );
};

export default HUFForm;
