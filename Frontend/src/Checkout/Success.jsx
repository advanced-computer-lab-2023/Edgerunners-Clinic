import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../UI/UX/Logo"
const Success = () => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("flag") === "false") {
      console.log("I here");
      (async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const packagename = queryParams.get("Name");
        const PaymentType = queryParams.get("PaymentType");

        if (PaymentType === "Package") {
          try {
            await axios
              .post(`http://localhost:3001/createHealthPackage`, {
                patientUsername: sessionStorage.getItem("Username"),
                packagename: packagename,
              })
              .then((res) => {
                console.log(res.status);
              });
          } catch (error) {
            console.error("Error adding package:", error);
          }
        } else if (PaymentType === "Appointment") {
          try {
            await axios.put(`http://localhost:3001/updateAppointment`, {
              DoctorUsername: sessionStorage.getItem("DoctorUsername"),
              Date: sessionStorage.getItem("Date"),
              TimeH: sessionStorage.getItem("TimeH"),
              TimeM: sessionStorage.getItem("TimeM"),
              Availability: "Reserved",
              PatientUsername: sessionStorage.getItem("Username"),
              NationalID: sessionStorage.getItem("NationalID"),
            });

            // Remove items from sessionStorage after successful update
            sessionStorage.removeItem("DoctorUsername");
            sessionStorage.removeItem("Date");
            sessionStorage.removeItem("TimeH");
            sessionStorage.removeItem("TimeM");
            sessionStorage.removeItem("NationalID");
          } catch (error) {
            console.error("Error updating appointment:", error);
          }
        }
        setHasRun(true);
      })();
      sessionStorage.setItem("flag", true);
    }
  }, []);
  const handleLogoClick = () => {
    sessionStorage.removeItem("flag");
  };
  return (
    <div>
      <a href="/PatientHome"  onClick={handleLogoClick}>
        <Logo />
      </a>
      <h1>Success</h1>
      <h2>Thank you for your purchase!</h2>
    </div>
  );
};

export default Success;
