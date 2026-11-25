// src/api.js

export const API_BASE_URL = import.meta.env.VITE_API_URL || "";
export const API_SUBMIT_URL = `${API_BASE_URL}/api/method/payu_frappe.api.submit_itr_details`;

/**
 * Common submission function used across different sections.
 * Frappe's orjson parser rejects raw JSON bodies from browsers.
 * Form-encoded data with a 'data' key is the correct approach — CSRF is disabled in site_config.
 * @param {Object} form - The form data object
 * @param {Object} files - The files object (optional)
 * @returns {Promise<Object>} - The JSON response from the server
 */
export const submitForm = async (form, files) => {
    console.log("--- NEW API.JS LOADED ---");
    // Remove alert after testing, but keep it for this one test so the user knows cache is clear

    // CACHE BUSTER: Force capitalize account_type
    if (form.account_type) {
        form.account_type = form.account_type.charAt(0).toUpperCase() + form.account_type.slice(1).toLowerCase();
        if (form.account_type.toUpperCase() === "HUF") {
            form.account_type = "HUF";
        }
    }

    // Send as form-encoded with JSON string in 'data' key
    // This is what Frappe's frappe.form_dict.get('data') reads on the backend
    const params = new URLSearchParams();
    params.append("data", JSON.stringify(form));

    // Add cache buster to timestamp to force browser to not cache the POST request
    const cacheBustUrl = `${API_SUBMIT_URL}?t=${new Date().getTime()}`;

    const res = await fetch(cacheBustUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Frappe-CSRF-Token": "fetch"
        },
        body: params.toString()
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error("Server error: " + res.status + " " + text.substring(0, 300));
    }

    const data = await res.json();

    // Frappe wraps its response in a `message` key
    const result = data.message || data;

    if (!result.success) {
        throw new Error(result.message || "Submission failed.");
    }

    return result;
};
