import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../UI/UX/Logo";

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
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-red-500 p-6 md:mx-auto flex flex-col items-center rounded-md">
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-white font-semibold text-center">
            Payment Error!
          </h3>
          <p className="text-white my-2">What did you do?!!</p>
          <p className="text-white"> Try again </p>
          <div className="py-10 text-center">
            <a
              href="/PatientHome"
              className="px-12 bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-md"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cancel;
