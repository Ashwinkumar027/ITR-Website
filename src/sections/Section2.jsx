import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";

const Section2 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        if (!form.reason || !form.reason.trim()) {
            return "Please share the reason before submitting";
        }
        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) return alert(err);

        try {
            setSubmitting(true);

            // Exit flow – backend / sheets already handled in final submit
            navigate("/success");
        } catch (e) {
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormLayout title="Thank You" step={2}>
            <div className="form-layout">

                {/* LEFT SIDEBAR – SAME AS SECTION 1 */}
                <aside className="sidebar">
                    <h4>Submission overview</h4>
                    <p>
                        Thank you for taking the time to respond. Your feedback helps us
                        improve our services.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>2 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Status</span>
                            <strong>Exit flow</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>No further details required</li>
                        <li>Your response is saved</li>
                        <li>You may submit again for another PAN</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@taxnest.in</strong>
                    </p>
                </aside>

                {/* RIGHT CONTENT */}
                <section className="form-content">

                    {/* INFO BOX */}
                    <div className="guidelines-box">
                        <h4>We value your feedback</h4>

                        <p>
                            You have indicated that you are not interested in using our Income
                            Tax filing services at this time.
                        </p>

                        <p>
                            Please help us understand the reason so that we can serve you
                            better in the future.
                        </p>
                    </div>

                    {/* REASON */}
                    <div className="form-group">
                        <label className="form-label">
                            Could you please share the reason? <span>*</span>
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Please share your reason here..."
                            value={form.reason || ""}
                            onChange={(e) => setField("reason", e.target.value)}
                        />

                        <small className="helper-text">
                            Your response will remain confidential.
                        </small>
                    </div>

                    {/* ACTION */}
                    <div className="action-row">
                        <button
                            className="primary-btn"
                            disabled={submitting}
                            onClick={handleSubmit}
                        >
                            {submitting ? "Submitting..." : "Submit & Finish"}
                        </button>
                    </div>

                </section>
            </div>
        </FormLayout>
    );
};

export default Section2;
