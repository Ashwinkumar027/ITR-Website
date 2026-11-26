import React from "react";
import "./RMBadge.css";

const RMBadge = ({ rmName = "Priya", subtitle = "Operations & Filing Team" }) => {
    return (
        <div className="rm-badge-banner">
            <div className="rm-badge-pulse"></div>
            <div className="rm-badge-icon">👩‍💼</div>
            <div className="rm-badge-text">
                <span className="rm-badge-title">
                    Dedicated Desk: <strong>{rmName}</strong>
                </span>
                <span className="rm-badge-sub">{subtitle} • Peer-Reviewed ICAI Firm</span>
            </div>
            <div className="rm-badge-tag">Verified Advisory</div>
        </div>
    );
};

export default RMBadge;
