import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RMBadge from "../components/RMBadge";
import SalesRMSearch from "../components/SalesRMSearch";
import PreConfirmationModal from "../components/PreConfirmationModal";
import { submitServiceForm } from "../api";
import "./HUFForm.css"; // Reuse the proven, elegant form styling

const PartnershipForm = () => {
    const navigate = useNavigate();

    // 1: Firm & Office, 2: Partners, 3: Managing Partner Contact
    const [currentStep, setCurrentStep] = useState(1);
    const [salesRM, setSalesRM] = useState(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        proposedFirmName: "",
        natureOfBusiness: "",
        commencementDate: "",
        officeAddress: "",
        managingPartnerName: "",
        email: "",
        countryCode: "+91",
        mobileNumber: "",
        whatsappNumber: "",
        sameAsMobile: true,
        partners: [
            {
                name: "",
                capital: "",
                profitRatio: "50",
                pan: "",
                aadhaar: ""
            },
            {
                name: "",
                capital: "",
                profitRatio: "50",
                pan: "",
                aadhaar: ""
            }
        ]
    });

    // File attachments
    const [files, setFiles] = useState({
        office_address_proof: null
    });

    // Partner files: keys like partner_pan_0, partner_aadhaar_0
    const [partnerFiles, setPartnerFiles] = useState({});

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Partners Dynamic Handlers
    const addPartner = () => {
        setFormData(prev => ({
            ...prev,
            partners: [
                ...prev.partners,
                { name: "", capital: "", profitRatio: "0", pan: "", aadhaar: "" }
            ]
        }));
    };

    const removePartner = (index) => {
        if (formData.partners.length <= 2) {
            alert("A partnership firm must have at least 2 partners.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            partners: prev.partners.filter((_, i) => i !== index)
        }));
    };

    const updatePartner = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.partners];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, partners: updated };
        });
    };

    const handlePartnerFileChange = (index, type, file) => {
        setPartnerFiles(prev => ({
            ...prev,
            [`partner_${type}_${index}`]: file
        }));
    };

    // Validations
    const validateStep1 = () => {
        if (!formData.proposedFirmName.trim()) return "Please enter proposed Partnership Firm Name.";
        if (!formData.natureOfBusiness.trim()) return "Please describe the nature of business / trading activities.";
        if (!formData.officeAddress.trim()) return "Please enter the principal place of business address.";
        return null;
    };

    const validateStep2 = () => {
        let totalRatio = 0;
        for (let i = 0; i < formData.partners.length; i++) {
            const p = formData.partners[i];
            if (!p.name.trim()) return `Please enter name for Partner #${i + 1}.`;
            if (!p.pan || p.pan.trim().length !== 10) return `Please enter 10-character PAN for Partner #${i + 1}.`;
            if (!p.aadhaar || p.aadhaar.replace(/\D/g, "").length !== 12) return `Please enter 12-digit Aadhaar for Partner #${i + 1}.`;
            totalRatio += parseFloat(p.profitRatio || 0);
        }
        if (Math.round(totalRatio) !== 100) {
            const proceed = window.confirm(`Total profit sharing ratio is currently ${totalRatio}% (ideally 100%). Would you like to proceed anyway?`);
            if (!proceed) return "Please adjust profit sharing ratios to total 100%.";
        }
        return null;
    };

    const validateStep3 = () => {
        if (!formData.managingPartnerName.trim()) return "Please enter Managing / Contact Partner name.";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address.";
        if (!formData.mobileNumber.trim() || formData.mobileNumber.replace(/\D/g, "").length < 10) return "Please enter a valid 10-digit mobile number.";
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

            const payload = {
                service_type: "Partnership Registration",
                account_type: "Partnership Firm",
                fullName: formData.proposedFirmName,
                proposed_firm_name: formData.proposedFirmName,
                nature_of_business: formData.natureOfBusiness,
                commencement_date: formData.commencementDate,
                communicationAddress: formData.officeAddress,
                permanentAddress: formData.officeAddress,
                name_as_per_pan: formData.managingPartnerName,
                email: formData.email,
                country_code: formData.countryCode,
                mobileNumber: formData.mobileNumber,
                altMobileNumber: formData.sameAsMobile ? formData.mobileNumber : formData.whatsappNumber,
                sales_rm: salesRM ? salesRM.user : "",
                sales_rm_name: salesRM ? salesRM.full_name : "",
                partners: formData.partners.map(p => ({
                    partner_name: p.name,
                    profit_sharing_ratio: p.profitRatio,
                    capital_contribution: p.capital,
                    pan: (p.pan || "").toUpperCase(),
                    aadhaar: p.aadhaar
                }))
            };

            const allFiles = {
                ...files,
                ...partnerFiles
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
        if (files.office_address_proof) count++;
        count += Object.values(partnerFiles).filter(f => f != null).length;
        return count;
    };

    return (
        <div className="huf-page-container">
            <div className="huf-card">
                {/* Header */}
                <div className="huf-header">
                    <Link to="/services" className="huf-back-link">← All Services</Link>
                    <div className="huf-header-content">
                        <span className="huf-service-tag">Corporate & Business Registration</span>
                        <h1 className="huf-title">Partnership Firm Registration</h1>
                        <p className="huf-subtitle">
                            Register your firm under the Indian Partnership Act, 1932. Complete deed drafting, stamp duty guidance, and CA certification.
                        </p>
                    </div>
                </div>

                {/* Desk Badge */}
                <RMBadge rmName="Priya" subtitle="Corporate Legal & Registration Desk" />

                {/* Stepper */}
                <div className="huf-stepper">
                    <div className={`step-node ${currentStep >= 1 ? "active" : ""}`}>
                        <div className="step-num">1</div>
                        <span className="step-label">Firm & Office</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-node ${currentStep >= 2 ? "active" : ""}`}>
                        <div className="step-num">2</div>
                        <span className="step-label">Partners & Ratios</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-node ${currentStep >= 3 ? "active" : ""}`}>
                        <div className="step-num">3</div>
                        <span className="step-label">Managing Contact</span>
                    </div>
                </div>

                {/* STEP 1: Firm Details */}
                {currentStep === 1 && (
                    <div className="form-step-section">
                        <h3 className="section-title">Step 1: Partnership Firm & Business Details</h3>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Proposed Partnership Firm Name <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. Aionion Trading Partners"
                                    value={formData.proposedFirmName}
                                    onChange={(e) => updateField("proposedFirmName", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date of Commencement (or proposed)</label>
                                <input
                                    type="date"
                                    value={formData.commencementDate}
                                    onChange={(e) => updateField("commencementDate", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Nature of Business / Trading Activity <span>*</span></label>
                            <textarea
                                rows={2}
                                placeholder="Describe primary commercial activities (e.g. Commodities Trading, Distribution, Financial Brokerage)"
                                value={formData.natureOfBusiness}
                                onChange={(e) => updateField("natureOfBusiness", e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Principal Place of Business (Office Address) <span>*</span></label>
                            <textarea
                                rows={2}
                                placeholder="Complete registered office address with City, State, and PIN code"
                                value={formData.officeAddress}
                                onChange={(e) => updateField("officeAddress", e.target.value)}
                            />
                        </div>

                        <div className="doc-upload-box">
                            <h4 className="doc-upload-title">Office Address Proof (Optional for initial intake)</h4>
                            <div className="file-input-group">
                                <label>Upload Electricity Bill / Rent Agreement / Property Tax Receipt</label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => setFiles(prev => ({ ...prev, office_address_proof: e.target.files[0] }))}
                                />
                                {files.office_address_proof && (
                                    <span className="file-attached-pill">✓ {files.office_address_proof.name}</span>
                                )}
                            </div>
                        </div>

                        {/* Sales RM Dropdown */}
                        <SalesRMSearch selectedRM={salesRM} onSelectRM={setSalesRM} />

                        <div className="form-actions-row">
                            <div></div>
                            <button type="button" className="btn-primary-action" onClick={handleNext}>
                                Continue to Partners List →
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: Partners Dynamic Builder */}
                {currentStep === 2 && (
                    <div className="form-step-section">
                        <div className="step-header-flex">
                            <div>
                                <h3 className="section-title">Step 2: Partners Details & Capital Contributions</h3>
                                <p className="section-desc">Add at least two partners with profit-sharing ratios.</p>
                            </div>
                            <button type="button" className="btn-add-member" onClick={addPartner}>
                                + Add Partner
                            </button>
                        </div>

                        {formData.partners.map((partner, index) => (
                            <div key={index} className="member-card-row">
                                <div className="member-card-header">
                                    <span className="member-badge">Partner #{index + 1}</span>
                                    {formData.partners.length > 2 && (
                                        <button
                                            type="button"
                                            className="btn-remove-member"
                                            onClick={() => removePartner(index)}
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>

                                <div className="form-grid-3">
                                    <div className="form-group">
                                        <label>Partner Full Name <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Legal Name as per PAN"
                                            value={partner.name}
                                            onChange={(e) => updatePartner(index, "name", e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Profit Sharing Ratio (%) <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 50"
                                            min={1}
                                            max={100}
                                            value={partner.profitRatio}
                                            onChange={(e) => updatePartner(index, "profitRatio", e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Capital Contribution (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 100000"
                                            value={partner.capital}
                                            onChange={(e) => updatePartner(index, "capital", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid-2">
                                    <div className="form-group">
                                        <label>Partner PAN Number <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="10-digit PAN"
                                            maxLength={10}
                                            value={partner.pan}
                                            onChange={(e) => updatePartner(index, "pan", e.target.value.toUpperCase())}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Partner Aadhaar Number <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="12-digit Aadhaar"
                                            maxLength={12}
                                            value={partner.aadhaar}
                                            onChange={(e) => updatePartner(index, "aadhaar", e.target.value.replace(/\D/g, ""))}
                                        />
                                    </div>
                                </div>

                                {/* Partner Document Uploads */}
                                <div className="member-upload-row">
                                    <div className="member-upload-col">
                                        <label>Upload PAN Card Copy</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handlePartnerFileChange(index, "pan", e.target.files[0])}
                                        />
                                    </div>
                                    <div className="member-upload-col">
                                        <label>Upload Aadhaar Card Copy</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handlePartnerFileChange(index, "aadhaar", e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="form-actions-row">
                            <button type="button" className="btn-secondary-action" onClick={() => setCurrentStep(1)}>
                                ← Back to Firm Details
                            </button>
                            <button type="button" className="btn-primary-action" onClick={handleNext}>
                                Continue to Managing Contact →
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: Managing Partner Contact */}
                {currentStep === 3 && (
                    <div className="form-step-section">
                        <h3 className="section-title">Step 3: Primary Contact & Communication</h3>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Managing / Primary Partner Name <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Name of partner handling communication"
                                    value={formData.managingPartnerName}
                                    onChange={(e) => updateField("managingPartnerName", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Official Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    placeholder="firm@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Primary Mobile Number <span>*</span></label>
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
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile"
                                        value={formData.mobileNumber}
                                        onChange={(e) => updateField("mobileNumber", e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>WhatsApp Number</label>
                                <input
                                    type="tel"
                                    placeholder="WhatsApp Number"
                                    disabled={formData.sameAsMobile}
                                    value={formData.sameAsMobile ? formData.mobileNumber : formData.whatsappNumber}
                                    onChange={(e) => updateField("whatsappNumber", e.target.value.replace(/\D/g, ""))}
                                />
                                <label className="checkbox-sub mt-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.sameAsMobile}
                                        onChange={(e) => updateField("sameAsMobile", e.target.checked)}
                                    />
                                    <span>Same as Primary Mobile Number</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-actions-row">
                            <button type="button" className="btn-secondary-action" onClick={() => setCurrentStep(2)}>
                                ← Back to Partners
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
                serviceTitle="Partnership Registration"
                applicantData={{
                    fullName: formData.proposedFirmName,
                    natureOfBusiness: formData.natureOfBusiness,
                    email: formData.email,
                    mobile: formData.mobileNumber,
                    country_code: formData.countryCode
                }}
                members={formData.partners}
                filesCount={countAttachedFiles()}
                salesRM={salesRM}
                loading={loading}
            />
        </div>
    );
};

export default PartnershipForm;
