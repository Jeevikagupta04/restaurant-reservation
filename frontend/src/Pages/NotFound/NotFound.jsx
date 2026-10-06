import React from "react";
import CommonButton from "../../components/CommonButton/CommonButton";

const NotFound = () => {
  return (
    <>
      <section className="notFound">
        <div className="container">
          <img src="/notFound.svg" alt="notFound" />
          <h1>LOOKS LIKE YOU'RE LOST</h1>
          <p>We can't seem to find you the page you're looking for</p>
          <div style={{ marginTop: "20px" }}>
            <CommonButton text="Back to Home" to="/" />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
