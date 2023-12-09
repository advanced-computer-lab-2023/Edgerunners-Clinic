import React from "react";
import { useState } from "react";
import axios from "axios";
import Logo from "../../UI/UX/Logo";

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
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/DoctorHome">
              <Logo />
            </a>
            <button
              className="navbar-toggler ps-0"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#pets">
                    Video Call
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#adoptions">
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="#foundation"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#help">
                    Health Record
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#education">
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#education">
                    Follow Up Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/EditMyProf"
                  >
                    My Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/doctorReg">
                    Log Out
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ps-2" href="#!">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="form-prescription">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="">Date</label>
              <input
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="TimeH">Hour</label>
              <input
                type="text"
                value={timeH}
                onChange={(e) => {
                  setTimeH(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="TimeM">Minute</label>
              <input
                type="text"
                value={timeM}
                onChange={(e) => {
                  setTimeM(e.target.value);
                }}
              />
            </div>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
