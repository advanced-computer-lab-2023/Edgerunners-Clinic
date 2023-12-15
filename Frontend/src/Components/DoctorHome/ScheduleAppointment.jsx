import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../UI/UX/Logo";

export default function ScheduleAppointment() {
  const [date, setDate] = useState("");
  const [timeH, setTimeH] = useState("");
  const [timeM, setTimeM] = useState("");
  const [patient, setPatient] = useState("");
  // let allNames = []
  // const handleNames = async()=>{
  //   async function getNames() {
  //     allNames = await axios.get(`http://localhost:3001/PatientsName/${sessionStorage.getItem("Username")}`)
  //   }
  //   await getNames();
  // }
  // handleNames();
  // console.log(allNames)

  function patientNames() {
    const [patientnames, setPatientnames] = useState([]);
    useEffect(() => {
      getMyAppointments();
      async function getMyAppointments() {
        const res = await axios.get(
          `http://localhost:3001/PatientsName/${sessionStorage.getItem(
            "Username"
          )}`
        );
        setPatientnames(res.data);
      }
    }, []);
    return patientnames;
  }

  let patientnames = patientNames();

  //   let patientName = axios.get(`http://localhost:3001/PatientsName/${sessionStorage.getItem("Username")}`)

  //   if(patientName){
  //     console.log(patientName)
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function AddAppointment(p) {
      await axios.post("http://localhost:3001/createFollowUp", p);
    }

    const p = {
      DoctorUsername: sessionStorage.getItem("Username"),
      PatientUsername: patient,
      Date: date,
      TimeH: timeH,
      TimeM: timeM,
    };
    await AddAppointment(p);
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
              <select className="labelShape"
                onChange={(e) => {
                  setPatient(e.target.value);
                }}
              >
                <option>Select Patient</option>
                {patientnames.map((patient, index) => {
                  return (
                    <option key={index} value={patient.username}>
                      {patient.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="">Date</label>
              <input
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="time-input-div">
              <div className="addapointment-item-time">
                <label htmlFor="TimeH">Time: </label>
                <input
                  type="text"
                  className="time-input"
                  maxlength="2"
                  value={timeH}
                  onChange={(e) => {
                    setTimeH(e.target.value);
                  }}
                />
              </div>
              <div className="addapointment-item-time">
                <label htmlFor="TimeM">:</label>
                <input
                  type="text"
                  className="time-input"
                  maxlength="2"
                  value={timeM}
                  onChange={(e) => {
                    setTimeM(e.target.value);
                  }}
                />
              </div>
            </div>
            <button  onClick={() => window.location.reload(false)} type="submit">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
