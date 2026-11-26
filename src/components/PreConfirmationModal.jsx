import React from "react";
import "./PreConfirmationModal.css";

const PreConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    serviceTitle,
    applicantData,
    members = [],
    filesCount = 0,
    salesRM = null,
    loading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-card">
                <div className="modal-header">
                    <div className="modal-badge">Pre-Confirmation Review</div>
                    <h2 className="modal-title">Review Your {serviceTitle} Application</h2>
                    <p className="modal-subtitle">
                        Please verify your details before submitting to our Advisory Desk.
                    </p>
                </div>

                <div className="modal-body">
                    {/* Primary Applicant Details */}
                    <div className="review-section">
                        <h4>Applicant & Contact Information</h4>
                        <div className="review-grid">
                            <div className="review-item">
                                <span className="review-label">Full Name / Entity:</span>
                                <span className="review-val">{applicantData.fullName || applicantData.name || "—"}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Contact Mobile:</span>
                                <span className="review-val">{applicantData.country_code || "+91"} {applicantData.mobile || applicantData.mobileNumber || "—"}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Email Address:</span>
                                <span className="review-val">{applicantData.email || "—"}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">PAN Number:</span>
                                <span className="review-val">{applicantData.pan || applicantData.pan_number || "—"}</span>
                            </div>
                            {applicantData.maritalStatus && (
                                <div className="review-item">
                                    <span className="review-label">Marital Status:</span>
                                    <span className="review-val">{applicantData.maritalStatus}</span>
                                </div>
                            )}
                            {applicantData.natureOfBusiness && (
                                <div className="review-item">
                                    <span className="review-label">Business Nature:</span>
                                    <span className="review-val">{applicantData.natureOfBusiness}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sales RM & Assigned Desk */}
                    <div className="review-section">
                        <h4>Assigned Relationship Team</h4>
                        <div className="review-grid">
                            <div className="review-item">
                                <span className="review-label">Sales Relationship Manager:</span>
                                <span className="review-val">
                                    {salesRM ? `${salesRM.full_name} (${salesRM.phone || salesRM.email})` : "General Inbound Pool"}
                                </span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Filing Review Lead:</span>
                                <span className="review-val">Priya & Accounts Team</span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Members or Partners Summary */}
                    {members && members.length > 0 && (
                        <div className="review-section">
                            <h4>Registered Members / Partners ({members.length})</h4>
                            <div className="review-table-wrapper">
                                <table className="review-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Role / Relationship</th>
                                            <th>PAN / Identity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((m, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td><strong>{m.name || m.partner_name || m.member_name}</strong></td>
                                                <td>{m.relationship || `${m.profit_sharing_ratio || m.profitRatio || 0}% Share`}</td>
                                                <td>{m.pan || (m.is_minor ? "Minor / Pending" : "Provided")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Documents & Payment Note */}
                    <div className="review-notice-box">
                        <div className="notice-icon">📄</div>
                        <div className="notice-text">
                            <strong>{filesCount} Document(s) Attached</strong>
                            <p>
                                Submission is <strong>₹0 upfront</strong>. Payment link will be issued by Priya only after document pre-check and clarification review.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn-modal-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        ← Edit Details
                    </button>
                    <button
                        type="button"
                        className="btn-modal-primary"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Submitting Application..." : "Confirm & Submit Application →"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreConfirmationModal;
