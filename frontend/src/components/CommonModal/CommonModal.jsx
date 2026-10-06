import React, { useEffect } from "react";
import "./CommonModal.css";

const CommonModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = "520px",
  className = "",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="common-modal-overlay" onClick={onClose}>
      <div
        className={`common-modal-content ${className}`.trim()}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="common-modal-header">
          <div className="common-modal-title-wrap">
            {icon && <div className="common-modal-icon-badge">{icon}</div>}
            <div>
              {title && <h2 className="common-modal-title">{title}</h2>}
              {subtitle && <p className="common-modal-subtitle">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            className="common-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div className="common-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default CommonModal;
