import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import GetDoctors from "./getDoctors";
import GetAppointments from "./getAppoinments";
import { UpdateAppointments } from "./getAppoinments";
import axios from "axios";

export default function Doctors() {
  const [education, setEducation] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  let Doc = GetDoctors({
    Education: education,
    Name: name,
  });
  let appointmentDate = GetAppointments({
    Date: date,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Doc = await GetDoctors({
      Education: education,
      Name: name,
    });
    appointmentDate = await GetAppointments({
      Date: date,
    });
  };
  const handleSubmit2 = async (e, doctor) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/updateAppointment`, {
      DoctorUsername: doctor,
      Availability: "Reserved",
    });
  };

  if (Doc || appointmentDate) {
    console.log(appointmentDate);
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
          <label htmlFor="">Speciality</label>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setEducation(e.target.value);
            }}
          />
          <label htmlFor="">doctor</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="">Date</label>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button type="submit" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
        <div>
          {/* {Doc.map((d, index) => {
            return (
              <div key={index}>
                <a>{d.Name}</a>
                <br />
                <a>{d.Hourlyrate + " EGP"}</a>
                <br />
                <a>{d.Affiliation}</a>
                <br />
                <a>{d.Education}</a>
                <br />
                <button>select</button>
              </div>
            );
          })} */}
          {appointmentDate.map((a, index) => {
            return (
              <div key={index}>
                <p>{a.Username}</p>
                
                <p>{a.Education}</p>
                <button
                  onClick={(e) =>
                    handleSubmit2(e, a.Username)
                  }
                >
                  reserve
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
