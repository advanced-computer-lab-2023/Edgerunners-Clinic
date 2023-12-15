import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../UI/UX/Logo";

export default function FollowUpRequests() {
  function requests() {
    const [patientnames, setPatientnames] = useState([]);
    useEffect(() => {
      getMyRequests();
      async function getMyRequests() {
        const res = await axios.get(`http://localhost:3001/getMyRequests`, {
          params: { Username: sessionStorage.getItem("Username") },
        });
        setPatientnames(res.data);
      }
    }, []);
    return patientnames;
  }

  let patientnames = requests();

  //   let patientName = axios.get(`http://localhost:3001/PatientsName/${sessionStorage.getItem("Username")}`)

  //   if(patientName){
  //     console.log(patientName)
  //   }

  const handleAccept = async (date, patient, timeH, timeM, NationalID) => {
    console.log(patient);
    const response = await axios.put("http://localhost:3001/acceptRequest", {
      DoctorUsername: sessionStorage.getItem("Username"),
      PatientUsername: patient,
      NationalID: NationalID,
      Date: date,
      TimeM: timeM,
      TimeH: timeH,
    });
    console.log(response.data);
  };

  const handleReject = async (date, patient, timeH, timeM, NationalID) => {
    console.log(patient);
    const response = await axios.delete("http://localhost:3001/deleteRequest", {
      params: {
        DoctorUsername: sessionStorage.getItem("Username"),
        PatientUsername: patient,
        NationalID: NationalID,
        Date: date,
        TimeM: timeM,
        TimeH: timeH,
      },
    });
    console.log(response.data);
  };

  return (
    <div className="Bootstrap DoctorHome">
      <div className="form-prescription">
        <br />
        <br />
        <br />
        <div className="addapointment-parent">
          <ul>
            {patientnames.map((patient, index) => (
              <li key={index}>
                <span style={{ marginRight: "10px" }}>
                  {patient.PatientUsername}
                </span>
                <span style={{ marginRight: "5px" }}>
                  {patient.Date.slice(0, patient.Date.indexOf("T"))}
                </span>
                <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                  {patient.TimeH}:{patient.TimeM}
                </span>
                <button
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    handleAccept(
                      patient.Date,
                      patient.PatientUsername,
                      patient.TimeH,
                      patient.TimeM,
                      patient.NationalID
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    handleReject(
                      patient.Date,
                      patient.PatientUsername,
                      patient.TimeH,
                      patient.TimeM,
                      patient.NationalID
                    );
                  }}
                >
                  Reject
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
