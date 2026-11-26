import React, { useState, useEffect } from "react";
import "./FileUploadWithPreview.css";

const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const FileUploadWithPreview = ({
    label,
    required = false,
    file = null,
    onChange,
    accept = "image/*,application/pdf",
    helperText = "Accepted: JPG, PNG, PDF (Max 10MB)",
    id
}) => {
    const inputId = id || `file-input-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const isImage = file && file.type && file.type.startsWith("image/");
    const isPdf = file && file.type === "application/pdf";

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    const handleFileChange = (e) => {
        const selected = e.target.files && e.target.files[0];
        if (selected) {
            if (selected.size > 10 * 1024 * 1024) {
                alert("File size exceeds 10MB limit. Please choose a smaller file.");
                return;
            }
            onChange(selected);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onChange(null);
        setIsPreviewModalOpen(false);
    };

    return (
        <div className="file-preview-component">
            <label className="file-field-label" htmlFor={inputId}>
                {label} {required && <span className="req-star">*</span>}
            </label>

            {!file ? (
                <div 
                    className="file-dropzone" 
                    onClick={() => document.getElementById(inputId).click()}
                >
                    <input
                        type="file"
                        id={inputId}
                        accept={accept}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <div className="dropzone-content">
                        <div className="dropzone-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <div className="dropzone-text">
                            <span className="dropzone-main-text">Click to upload document</span>
                            <span className="dropzone-sub-text">{helperText}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="file-selected-box">
                    <div className="file-thumb-container" onClick={() => setIsPreviewModalOpen(true)}>
                        {isImage && previewUrl ? (
                            <img src={previewUrl} alt="Document Thumbnail" className="file-thumb-img" />
                        ) : isPdf ? (
                            <div className="file-thumb-pdf">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                                <span>PDF</span>
                            </div>
                        ) : (
                            <div className="file-thumb-generic">
                                <span>DOC</span>
                            </div>
                        )}
                        <span className="thumb-zoom-hint">👁️ View</span>
                    </div>

                    <div className="file-meta">
                        <span className="file-display-name" title={file.name}>
                            {file.name}
                        </span>
                        <div className="file-sub-row">
                            <span className="file-display-size">{formatBytes(file.size)}</span>
                            <span className="file-ready-badge">✓ Attached</span>
                        </div>
                    </div>

                    <div className="file-actions">
                        <button
                            type="button"
                            className="btn-preview-modal"
                            onClick={() => setIsPreviewModalOpen(true)}
                            title="Preview Document"
                        >
                            👁️ Preview
                        </button>
                        <button
                            type="button"
                            className="btn-remove-file"
                            onClick={handleRemove}
                            title="Remove File"
                        >
                            ✕ Remove
                        </button>
                    </div>
                </div>
            )}

            {/* Document Preview Modal */}
            {isPreviewModalOpen && previewUrl && (
                <div className="doc-preview-modal-overlay" onClick={() => setIsPreviewModalOpen(false)}>
                    <div className="doc-preview-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="doc-preview-modal-header">
                            <div className="doc-header-info">
                                <h4 className="doc-preview-title">{label}</h4>
                                <span className="doc-preview-meta">
                                    {file.name} ({formatBytes(file.size)})
                                </span>
                            </div>
                            <button
                                type="button"
                                className="doc-preview-close"
                                onClick={() => setIsPreviewModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="doc-preview-body">
                            {isImage ? (
                                <img src={previewUrl} alt="Document Preview" className="doc-preview-img" />
                            ) : isPdf ? (
                                <iframe
                                    src={previewUrl}
                                    title="PDF Document Preview"
                                    className="doc-preview-iframe"
                                />
                            ) : (
                                <div className="doc-preview-fallback">
                                    <p>File attached: <strong>{file.name}</strong></p>
                                    <a href={previewUrl} download={file.name} className="doc-download-btn">
                                        Download / Open File
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadWithPreview;
