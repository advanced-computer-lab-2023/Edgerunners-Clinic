import React, { useState, useEffect } from "react";
import axios from "axios";
import sendEmail from "./confirmApp";
import sendEmailp from "../Patient/confirmingapp";
export default function ScheduleAppointment() {
  const [date, setDate] = useState("");
  const [timeH, setTimeH] = useState("");
  const [timeM, setTimeM] = useState("");
  const [patient, setPatient] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [patientEmail, setpatientEmail] = useState("");
  const [patientnames, setPatientnames] = useState([]);
const [reload,setreload]=useState(false);

   useEffect(() => {
    getPatientEmail();
    getDoctorEmail();
    getPatientNames();
   }, []);

  const getPatientNames = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/PatientsName/${sessionStorage.getItem(
          "Username"
        )}`
      );
      setPatientnames(res.data);
    } catch (error) {
      console.error("Error fetching patient names:", error);
    }
  };
  const getPatientEmail = async () => {
    try {
      const response =await axios.post("http://localhost:3001/getPatients",{params:{Username: patient}});
      setpatientEmail(response.data.Email);
    } catch (error) {
      console.error("Error fetching patient names:", error);
    }
  };

  // Function to get the doctor's email
  const getDoctorEmail = async () => {
    try {
      const response =await axios.post("http://localhost:3001/getDoctors",{params:{Username: sessionStorage.getItem("Username")}});
      setDoctorEmail(response.data.Email);
    } catch (error) {
      console.error("Error fetching doctor email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const appointmentData = {
        DoctorUsername: sessionStorage.getItem("Username"),
        PatientUsername: patient,
        Date: date,
        TimeH: timeH,
        TimeM: timeM,
      };
      await axios.post("http://localhost:3001/createFollowUp", appointmentData);

      // Create a notification for the doctor
      const doctorNotification = {
        doctorUsername: sessionStorage.getItem("Username"),
        message: `Hello Dr ${sessionStorage.getItem("Username")}, we want to remind you of rescheduling an appointment with ${patient} at ${date}`,
      };
      await axios.post(
        "http://localhost:3001/createNotification",
        doctorNotification
      );

      // Create a notification for the patient
      const patientNotification = {
        patientUsername: patient,
        message: `Hello ${patient}, Dr ${sessionStorage.getItem("Username")} rescheduled the appointment with you at ${date}`,
      };
      await axios.post(
        "http://localhost:3001/createNotification",
        patientNotification
      );
      sendEmail({
        DocrorUserName: sessionStorage.getItem("Username"),
        message: `Appointment rescheduled with ${patient} on ${date}`,
        doctorEmail: doctorEmail,
      });
      sendEmailp({
        PatientUserName: `${patient}'s Name`,
        message: `Your appointment with Dr ${sessionStorage.getItem("Username")} is rescheduled on ${date}`,
        patientEmail: patientEmail,
      });
      // Reload the page or handle redirection as needed
     
     setreload(true);
     if(reload){
  window.location.reload(false);
     }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  return (
    <div className="Bootstrap DoctorHome">
      <div className="form-prescription">
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <br />
          <div className="addapointment-parent">
            <div className="addapointment-item">
              <label htmlFor="Patient">Patient Name</label>
              <select
                className="labelShape"
                onChange={(e) => setPatient(e.target.value)}
              >
                <option>Select Patient</option>
                {patientnames.map((patient, index) => (
                  <option key={index} value={patient.username}>
                    {patient.name}
                  </option>
                ))}
              </select>
              <label htmlFor="">Date</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="time-input-div">
              <div className="addapointment-item-time">
                <label htmlFor="TimeH">Time: </label>
                <input
                  type="text"
                  className="time-input"
                  maxLength="2"
                  value={timeH}
                  onChange={(e) => setTimeH(e.target.value)}
                />
              </div>
              <div className="addapointment-item-time">
                <label htmlFor="TimeM">:</label>
                <input
                  type="text"
                  className="time-input"
                  maxLength="2"
                  value={timeM}
                  onChange={(e) => setTimeM(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
