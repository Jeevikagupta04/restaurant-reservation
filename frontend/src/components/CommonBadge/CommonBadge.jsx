import React from "react";
import "./CommonBadge.css";

const statusConfig = {
  confirmed: { label: "Confirmed", className: "badge-confirmed" },
  pending: { label: "Pending", className: "badge-pending" },
  cancelled: { label: "Cancelled", className: "badge-cancelled" },
  admin: { label: "Admin", className: "badge-admin" },
  active: { label: "Active", className: "badge-active" },
};

const CommonBadge = ({
  status,
  label,
  variant = "status",
  size = "md",
  showDot = true,
  className = "",
  style = {},
  ...props
}) => {
  const normalizedKey = status ? String(status).toLowerCase() : "";
  const config = statusConfig[normalizedKey] || {
    label: label || status || "Default",
    className: `badge-${normalizedKey || "default"}`,
  };

  const displayLabel = label || config.label;
  const badgeClasses = `common-badge ${config.className} badge-${size} badge-variant-${variant} ${className}`.trim();

  return (
    <span className={badgeClasses} style={style} {...props}>
      {showDot && <span className="common-badge-dot" />}
      <span className="common-badge-label">{displayLabel}</span>
    </span>
  );
};

export default CommonBadge;
