import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="banner">
          <div className="left">JEEVIKA</div>
          <div className="right">
            <p>Z6 Gulshan-e-Maymar, Karachi</p>
            <p>Open: 05:00 PM - 12:00 AM</p>
          </div>
        </div>
        <div className="banner">
          <div className="left">
            <p>Developed By JEEVIKA</p>
          </div>
          <div className="right">
            <p>All Rights Reserved By Jeevika.</p>
            <Link
              to="/admin"
              style={{
                color: "#111111",
                textDecoration: "underline",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "1px",
                display: "inline-block",
                marginTop: "4px",
              }}
            >
              Staff Admin Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;