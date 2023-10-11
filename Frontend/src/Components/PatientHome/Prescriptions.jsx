import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import GetPrescriptions from "./getPrescriptions";

export default function Prescriptions() {
  const [date, setDate] = useState();
  const [doctor, setDoctor] = useState();
  const [status, setStatus] = useState();
  console.log("date is: " + date);
  let Prescriptions = GetPrescriptions({
    Patient: sessionStorage.getItem("Username"),
    Date: date,
    Doctor: doctor,
    Status: status,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Prescriptions = await GetPrescriptions({
      Date: date,
      Doctor: doctor,
      Status: status,
    });
  };

  if (Prescriptions) {
    console.log(Prescriptions);
    return (
      <div className="Bootstrap PatientHome">
        <div className="header">
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
              <Logo />
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
              <div className="collapse navbar-collapse" id="navbarExample01">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#pets">
                      Video Call
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#adoptions"
                    >
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
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#education"
                    >
                      Prescriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#about">
                      My Account
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#contact">
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
          <label htmlFor="">Date</label>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <label htmlFor="">Status</label>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => {
              if (e.target.checked) {
                setStatus("Filled");
              } else {
                setStatus("Unfilled");
              }
            }}
          />
          <label htmlFor="">doctor</label>
          <input
            type="text"
            onChange={(e) => {
              setDoctor(e.target.value);
            }}
          />
          <button type="submit" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
        <div>
          {Prescriptions.map((p, index) => {
            return (
              <div key={index}>
                <a>{p.Patient}</a>
                <br />
                <a>{p.Status}</a>
                <br />
                <a>{p.Doctor}</a>
                <br />
                <a>{p.Date}</a>
                <br />
                <button>select</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
