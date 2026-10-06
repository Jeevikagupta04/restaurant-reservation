import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { HiOutlineArrowRight } from "react-icons/hi";
import "./CommonButton.css";

const CommonButton = ({
  text,
  children,
  to,
  isScroll = false,
  onClick,
  type = "button",
  variant = "outline",
  size = "normal",
  icon = <HiOutlineArrowRight />,
  disabled = false,
  className = "",
  style = {},
  ...props
}) => {
  const content = text || children;
  const combinedClasses = `common-btn ${variant} ${size} ${className}`.trim();

  const iconElement = icon ? (
    <span className="common-btn-icon">{icon}</span>
  ) : null;

  // React Scroll Link (In-page anchor)
  if (to && isScroll) {
    return (
      <ScrollLink
        to={to}
        spy={true}
        smooth={true}
        duration={500}
        className={combinedClasses}
        style={style}
        onClick={onClick}
        {...props}
      >
        <span className="common-btn-text">{content}</span>
        {iconElement}
      </ScrollLink>
    );
  }

  // React Router Link (Page navigation)
  if (to && !isScroll) {
    return (
      <RouterLink
        to={to}
        className={combinedClasses}
        style={style}
        onClick={onClick}
        {...props}
      >
        <span className="common-btn-text">{content}</span>
        {iconElement}
      </RouterLink>
    );
  }

  // Standard Button
  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      style={style}
      onClick={onClick}
      {...props}
    >
      <span className="common-btn-text">{content}</span>
      {iconElement}
    </button>
  );
};

export default CommonButton;
