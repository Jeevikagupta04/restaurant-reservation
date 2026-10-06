import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/CommonButton/CommonButton";

const Success = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((preCount) => {
        if (preCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return preCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate]);

  return (
    <>
      <section className="notFound">
        <div className="container">
          <img src="/sandwich.png" alt="success" />
          <h1>Redirecting to Home in {countdown} seconds...</h1>
          <div style={{ marginTop: "20px" }}>
            <CommonButton text="Back to Home" to="/" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;