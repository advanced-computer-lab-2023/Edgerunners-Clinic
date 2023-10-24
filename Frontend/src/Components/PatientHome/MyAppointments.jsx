import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import {
  FilterAppointmentsDate,
  FilterAppointmentsStatus,
} from "./getAppoinments";

export default function PatientAppointments() {
  const [state, setState] = useState();
  const [which, setWhich] = useState(false);
  const PatientUsername = sessionStorage.getItem("Username");
  const [date, setDate] = useState();

  let appointmentStatus = FilterAppointmentsStatus({
    Status: state,
    PatientUsernameName: PatientUsername,
  });

  let appointmentDate = FilterAppointmentsDate({
    Date: date,
    PatientUsernameName: PatientUsername,
  });

  const handleSubmit = async (e) => {
    e.preventDefaut();
    appointmentDate = FilterAppointmentsDate({
      Date: date,
      PatientUsernameName: PatientUsername,
    });
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    appointmentStatus = FilterAppointmentsStatus({
      Status: state,
      PatientUsernameName: PatientUsername,
    });
  };

  if (appointmentDate || appointmentStatus) {
    return (
      <div className="Bootstrap PatientHome">
        <div className="header">
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
              <a href="/PatientHome">
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
                      Doctors
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
          <label htmlFor="">Status</label>
          <select
            onChange={(e) => {
              setState(e.target.value);
              setWhich(true);
            }}
          >
            <option value="Boody"></option>
            <option value="Upcoming">Upcoming</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="">Date</label>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              setDate(e.target.value);
              setWhich(false);
            }}
          />
        </div>
        <div>
          {which
            ? appointmentStatus.map((a, index) => {
                return (
                  <div key={index}>
                    <p>Name: {a.DoctorUsername}</p>
                    <p>Availability: {a.Availability}</p>
                    <p>Status: {a.Status}</p>
                    <p>Available Date:{a.Date}</p>
                  </div>
                );
              })
            : appointmentDate.map((a, index) => {
                return (
                  <div key={index}>
                    <p> Doctor name: {a.DoctorUsername}</p>
                    <p>Status: {a.Status}</p>
                    <p>Appointment Date:{a.Date}</p>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
