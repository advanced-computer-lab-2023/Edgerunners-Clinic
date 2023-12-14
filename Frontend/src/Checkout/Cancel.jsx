import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../UI/UX/Logo"

const Cancel = () => {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasRunRef.current) {
      (async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const PaymentType = queryParams.get("PaymentType");

        if (PaymentType === "Package") {
          sessionStorage.removeItem("flag");
        }

        if (PaymentType === "Appointment") {
          sessionStorage.removeItem("DoctorUsername");
          sessionStorage.removeItem("Date");
          sessionStorage.removeItem("TimeH");
          sessionStorage.removeItem("TimeM");
          sessionStorage.removeItem("NationalID");
          sessionStorage.removeItem("Availability");
        }
        hasRunRef.current = true;
      })();
    }
  }, []);

  return (
    <div>
      <a href="/PatientHome">
        <Logo />
      </a>
      <h1>Cancel</h1>
      <h2>Your payment was canceled.</h2>
    </div>
  );
};
export default Cancel;
