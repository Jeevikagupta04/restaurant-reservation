import React, { forwardRef } from "react";
import "./CommonInput.css";

const CommonInput = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "",
      error,
      helperText,
      icon,
      required = false,
      disabled = false,
      className = "",
      as = "input",
      rows = 3,
      children,
      ...props
    },
    ref
  ) => {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className={`common-input-group ${hasError ? "has-error" : ""} ${className}`.trim()}>
        {label && (
          <label htmlFor={inputId} className="common-input-label">
            {label}
            {required && <span className="common-input-required-asterisk">*</span>}
          </label>
        )}

        <div className="common-input-wrapper">
          {icon && <span className="common-input-icon">{icon}</span>}

          {as === "textarea" ? (
            <textarea
              id={inputId}
              name={name}
              ref={ref}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              className={`common-input-field ${icon ? "with-icon" : ""}`}
              {...props}
            />
          ) : as === "select" ? (
            <select
              id={inputId}
              name={name}
              ref={ref}
              disabled={disabled}
              className={`common-input-field ${icon ? "with-icon" : ""}`}
              {...props}
            >
              {children}
            </select>
          ) : (
            <input
              id={inputId}
              name={name}
              ref={ref}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`common-input-field ${icon ? "with-icon" : ""}`}
              {...props}
            />
          )}
        </div>

        {hasError ? (
          <span className="common-input-error" role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span className="common-input-helper">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

CommonInput.displayName = "CommonInput";

export default CommonInput;
