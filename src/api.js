// src/api.js

export const API_BASE_URL = import.meta.env.VITE_API_URL || "";
export const API_SUBMIT_URL = `${API_BASE_URL}/api/method/payu_frappe.api.submit_itr_details`;
export const API_SALES_RMS_URL = `${API_BASE_URL}/api/method/payu_frappe.api.get_active_sales_rms`;

/**
 * Fetch list of active Sales Relationship Managers for website dropdown.
 */
export const fetchSalesRMs = async () => {
    try {
        const res = await fetch(`${API_SALES_RMS_URL}?t=${new Date().getTime()}`);
        if (!res.ok) {
            console.warn("Failed to fetch Sales RMs, using fallback list.");
            return [];
        }
        const data = await res.json();
        return data.message || data || [];
    } catch (err) {
        console.warn("Error fetching Sales RMs:", err);
        return [];
    }
};

/**
 * Universal submission function supporting multipart files and child table data.
 * @param {Object} form - Form data object
 * @param {Object} files - Dictionary of files (e.g. { karta_pan_attachment: file, huf_pan_0: file, ... })
 * @returns {Promise<Object>} - JSON result from server
 */
export const submitServiceForm = async (form, files = {}) => {
    const cacheBustUrl = `${API_SUBMIT_URL}?t=${new Date().getTime()}`;
    const formData = new FormData();
    formData.append("data", JSON.stringify(form));

    if (files) {
        Object.entries(files).forEach(([key, file]) => {
            if (file && file instanceof File) {
                formData.append(key, file);
            }
        });
    }

    const res = await fetch(cacheBustUrl, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error("Server error: " + res.status + " " + text.substring(0, 300));
    }

    const data = await res.json();
    const result = data.message || data;

    if (!result.success) {
        throw new Error(result.message || "Submission failed.");
    }

    return result;
};

/**
 * Backward-compatible submitForm for ITR sections.
 */
export const submitForm = async (form, files) => {
    if (form.account_type) {
        form.account_type = form.account_type.charAt(0).toUpperCase() + form.account_type.slice(1).toLowerCase();
        if (form.account_type.toUpperCase() === "HUF") {
            form.account_type = "HUF";
        }
    }

    return submitServiceForm(form, files);
};
