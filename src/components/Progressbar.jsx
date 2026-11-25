import React from "react";

const ProgressBar = ({ step, total = 11 }) => {
    const pct = Math.round((step / total) * 100);

    return (
        <div className="progress-indicator">
            <div className="progress-text">
                <span className="step-text">Step {step} of {total}</span>
                <span className="percentage-text">{pct}% complete</span>
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{
                        width: `${pct}%`,
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
