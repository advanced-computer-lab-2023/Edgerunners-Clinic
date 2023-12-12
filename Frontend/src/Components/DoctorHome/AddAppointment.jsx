import React from "react";
import { useState } from "react";
import axios from "axios";

export default function AddAppointment() {
  const [date, setDate] = useState("");
  const [timeH, setTimeH] = useState("");
  const [timeM, setTimeM] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function AddAppointment(p) {
      await axios.post("http://localhost:3001/createAppointment", p);
    }

    const p = {
      DoctorUsername: sessionStorage.getItem("Username"),
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
          <div className="addapointment-parent">
            <div className="addapointment-item">
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
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
