import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { useForm } from "../context/FormContext";
import { handleSaveAndExit } from "../utils/navigation";

const Section10 = () => {
    const navigate = useNavigate();
    const { form, setField } = useForm();

    const validate = () => {
        if (!form.hasRentedHome)
            return "Please select whether you have given your home on rent";

        if (form.hasRentedHome === "yes") {
            if (!form.annualRent || isNaN(form.annualRent))
                return "Please enter total annual rent";

            // housingLoan is OPTIONAL
            if (!form.loanUsage || !form.loanUsage.trim())
                return "Please specify how the house is utilized";
        }

        return null;
    };

    const handleNext = () => {
        const err = validate();
        if (err) return alert(err);
        navigate("/section-11");
    };

    return (
        <FormLayout title="House / Residential Property Details" step={10}>
            <div className="form-layout">

                {/* LEFT SIDEBAR */}
                <aside className="sidebar">
                    <h4>Property details</h4>
                    <p>
                        Please provide details of your residential property income.
                    </p>

                    <div className="sidebar-box">
                        <div className="sidebar-chip">
                            <span>Current step</span>
                            <strong>10 / 11</strong>
                        </div>
                        <div className="sidebar-chip">
                            <span>Section type</span>
                            <strong>Income</strong>
                        </div>
                    </div>

                    <ul className="sidebar-points">
                        <li>Rental income information</li>
                        <li>No documents required here</li>
                        <li>Values should be annual totals</li>
                    </ul>

                    <p className="sidebar-help">
                        Need help? <br />
                        <strong>support@angassociates.com</strong>
                    </p>
                </aside>

                {/* RIGHT FORM */}
                <section className="form-content">

                    {/* INFO BOX */}
                    <div className="guidelines-box">
                        <h4>Rental income details</h4>
                        <p>
                            Enter information related to residential properties owned by you
                            during the financial year.
                        </p>
                    </div>

                    {/* RENTAL QUESTION */}
                    <div className="form-group">
                        <label className="form-label">
                            Have you given your home on rent to 3rd party? <span>*</span>
                        </label>

                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${form.hasRentedHome === "yes" ? "active" : ""
                                    }`}
                                onClick={() => setField("hasRentedHome", "yes")}
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                className={`choice-btn ${form.hasRentedHome === "no" ? "active" : ""
                                    }`}
                                onClick={() => setField("hasRentedHome", "no")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* RENT-RELATED QUESTIONS - Only show if rented */}
                    {form.hasRentedHome === "yes" && (
                        <>
                            {/* ANNUAL RENT */}
                            <div className="form-group">
                                <label className="form-label">
                                    Total Annual Rent (INR) <span>*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter total rent received in the year"
                                    value={form.annualRent || ""}
                                    onChange={(e) => setField("annualRent", e.target.value)}
                                />
                            </div>

                            {/* HOUSING LOAN */}
                            <div className="form-group">
                                <label className="form-label">
                                    Do you have an active housing loan?
                                </label>

                                <div className="choice-group">
                                    <button
                                        type="button"
                                        className={`choice-btn ${form.housingLoan === "yes" ? "active" : ""
                                            }`}
                                        onClick={() => setField("housingLoan", "yes")}
                                    >
                                        Yes
                                    </button>

                                    <button
                                        type="button"
                                        className={`choice-btn ${form.housingLoan === "no" ? "active" : ""
                                            }`}
                                        onClick={() => setField("housingLoan", "no")}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {/* LOAN USAGE */}
                            <div className="form-group">
                                <label className="form-label">
                                    How is the house utilized? <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Self-occupied / Rented / Vacant"
                                    value={form.loanUsage || ""}
                                    onChange={(e) => setField("loanUsage", e.target.value)}
                                />
                            </div>
                        </>
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
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(-1)}
                        >
                            Back
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

export default Section10;
