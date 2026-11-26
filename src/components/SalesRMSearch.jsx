import React, { useState, useEffect } from "react";
import { fetchSalesRMs } from "../api";
import "./SalesRMSearch.css";

const FALLBACK_SALES_RMS = [
    { user: "ashwinkumark@gmail.com", full_name: "Ashwin", email: "ashwinkumark@gmail.com", phone: "9090909090" },
    { user: "kumar@gmail.com", full_name: "Kumar", email: "kumar@gmail.com", phone: "9898989898" },
    { user: "ash9952945782@gmail.com", full_name: "Karthik", email: "ash9952945782@gmail.com", phone: "9952945782" }
];

const SalesRMSearch = ({ selectedRM, onSelectRM }) => {
    const [rms, setRms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadRMs = async () => {
            setLoading(true);
            try {
                const data = await fetchSalesRMs();
                if (isMounted) {
                    if (data && data.length > 0) {
                        setRms(data);
                    } else {
                        setRms(FALLBACK_SALES_RMS);
                    }
                }
            } catch (e) {
                if (isMounted) setRms(FALLBACK_SALES_RMS);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadRMs();
        return () => { isMounted = false; };
    }, []);

    const filtered = rms.filter((r) => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return true;
        const name = (r.full_name || "").toLowerCase();
        const email = (r.email || r.user || "").toLowerCase();
        const phone = (r.phone || "").toLowerCase();
        return name.includes(query) || email.includes(query) || phone.includes(query);
    });

    return (
        <div className="sales-rm-search-container">
            <label className="sales-rm-label">
                <span>Trading Relationship Manager (Optional)</span>
                <span className="sales-rm-hint">If you are working with a specific sales manager, search and select them here</span>
            </label>

            {selectedRM ? (
                <div className="selected-rm-card">
                    <div className="selected-rm-avatar">
                        {selectedRM.full_name ? selectedRM.full_name.charAt(0).toUpperCase() : "RM"}
                    </div>
                    <div className="selected-rm-info">
                        <strong className="selected-rm-name">{selectedRM.full_name}</strong>
                        <span className="selected-rm-meta">
                            {selectedRM.phone && <span>📞 {selectedRM.phone}</span>}
                            {selectedRM.email && <span>✉️ {selectedRM.email}</span>}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="btn-change-rm"
                        onClick={() => {
                            onSelectRM(null);
                            setSearchTerm("");
                            setIsOpen(true);
                        }}
                    >
                        Change
                    </button>
                </div>
            ) : (
                <div className="rm-search-dropdown-wrapper">
                    <div className="rm-search-input-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by Name, Phone, or Email (e.g. Ashwin, 9090909090)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="search-clear-btn"
                                onClick={() => setSearchTerm("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {isOpen && (
                        <div className="rm-options-list">
                            {loading ? (
                                <div className="rm-option-empty">Loading active managers...</div>
                            ) : filtered.length === 0 ? (
                                <div className="rm-option-empty">
                                    No manager matched "{searchTerm}".
                                    <button
                                        type="button"
                                        className="btn-link-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Skip this field
                                    </button>
                                </div>
                            ) : (
                                filtered.map((r) => (
                                    <div
                                        key={r.user}
                                        className="rm-option-item"
                                        onClick={() => {
                                            onSelectRM(r);
                                            setIsOpen(false);
                                            setSearchTerm("");
                                        }}
                                    >
                                        <div className="rm-avatar-sm">
                                            {r.full_name ? r.full_name.charAt(0).toUpperCase() : "R"}
                                        </div>
                                        <div className="rm-option-details">
                                            <span className="rm-name">{r.full_name}</span>
                                            <span className="rm-sub">
                                                {r.phone && <span>{r.phone}</span>}
                                                {r.email && <span>• {r.email}</span>}
                                            </span>
                                        </div>
                                        <span className="btn-select-tag">Select</span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalesRMSearch;
