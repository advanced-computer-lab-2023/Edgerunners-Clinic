import React, { useEffect, useState } from "react";
import Logo from "../../UI/UX/Logo";
import {
  FilterAppointmentsDate,
  FilterAppointmentsStatus,
} from "./getAppointments";
 import { GetAppointmentsFilter } from "../PatientHome/getAppoinments";
import GetAppointments from "../PatientHome/getAppoinments";
import axios from "axios";
import FilterModal from "../PatientHome/FilterModal";

export default function DoctorAppointments() {
  const [state, setState] = useState();
  const [which, setWhich] = useState(false);
  const DoctorUsername = sessionStorage.getItem("Username");
  const [patientUsername, setPatientUsername] = useState();

  const [date, setDate] = useState();
  const [timeH, setTimeH] = useState();
  const [timeM, setTimeM] = useState();
  const [docUser, setDocUser] = useState();
  const [rescheduleDate, setRescheduleDate] = useState();

  const [newdate, setNewdate] = useState();
  const [newtimeH, setNewTimeH] = useState();
  const [newtimeM, setNewTimeM] = useState();
  const [newdocUser, setNewDocUser] = useState();
  const [nationalid, setnationalid] = useState();
  const [filterModalCancel, setFilterModalCancel] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  let appointmentStatus = FilterAppointmentsStatus({
    Status: state,
    DoctorUsername: DoctorUsername,
  });

  let appointmentDate = FilterAppointmentsDate({
    Date: date,
    DoctorUsername: DoctorUsername,
  });

  let appointmentNew = GetAppointmentsFilter({
    DoctorUsername: DoctorUsername,
  });

  const handleSubmit = async (e) => {
    e.preventDefaut();
    appointmentDate = FilterAppointmentsDate({
      Date: date,
      DoctorUsername: DoctorUsername,
    });
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    appointmentStatus = FilterAppointmentsStatus({
      Status: state,
      DoctorUsername: DoctorUsername,
    });
  };

  const handleReschedule = async (e) => {
    await axios.put("http://localhost:3001/rescheduleAppointment", {
      DoctorUsername: DoctorUsername,
      PatientUsername: patientUsername,
      Date: rescheduleDate,
      TimeH: timeH,
      TimeM: timeM,
    });
  };

  const handleCancel = async (e) => {
    console.log(docUser);
    await axios.put("http://localhost:3001/cancelAppointment", {
      DoctorUsername: DoctorUsername,
      PatientUsername: patientUsername,
      Date: rescheduleDate,
      TimeH: timeH,
      TimeM: timeM,
    });
  };

  useEffect(() => {}, [newdocUser, newdate, newtimeH, newtimeM, nationalid]);
  const handleReschedule2 = async (e) => {
    console.log(patientUsername);
    await axios.put("http://localhost:3001/updateAppointment", {
      DoctorUsername: DoctorUsername ,
      Date: newdate,
      TimeH: newtimeH,
      TimeM: newtimeM,
      Availability: "Reserved",
      Status: "Rescheduled",
      PatientUsername: patientUsername,
      NationalID: nationalid,
    });
  };

  if (appointmentDate || appointmentStatus) {
    return (
      <div className="Bootstrap PatientHome">
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
            <option value="">Status</option>
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
        {filterModalCancel ? (
                      <FilterModal>
                        <div className="speciality-filter">
                          <p>Are sure you want to cancel the appointment?</p>
                        </div>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                            handleCancel();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                          }}
                        >
                          Cancel
                        </button>
                      </FilterModal>
                    ) : null}
                    
                    {filterModal ? (
                      <FilterModal>
                        <div className="speciality-filter">
                          {appointmentNew.map((a, newindex) => {
                            return (
                              <label
                                id={a}
                                key={newindex}
                                onClick={() => {
                                  setNewDocUser(a.DoctorUsername);
                                  setNewTimeH(a.TimeH);
                                  setNewTimeM(a.TimeM);
                                  setNewdate(a.Date);
                                  console.log(patientUsername);
                                }}
                              >
                                <p>{a.Date.toString().split("T")[0]}</p>
                                <p>
                                  {a.TimeH}:{a.TimeM}
                                </p>
                              </label>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => {
                            setFilterModal(false);
                            handleReschedule();
                            handleReschedule2();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModal(false);
                          }}
                        >
                          Cancel
                        </button>
                      </FilterModal>
                    ) : null}
        <div>
          {which
            ? appointmentStatus.map((a, index) => {
              {if(a.Availability == "Reserved")
                return (
                  <div key={index}>
                    <p>Patient name: {a.PatientUsername}</p>
                    <p>Status: {a.Status}</p>
                    <p>Appointment Date:{a.Date.toString().split("T")[0]}</p>
                    <p>
                      Time: {a.TimeH}:{a.TimeM}
                    </p>
                    <button
                      onClick={() => {
                        setFilterModal(true);
                        setRescheduleDate(a.Date);
                        setTimeH(a.TimeH);
                        setTimeM(a.TimeM);
                        setDocUser(a.DoctorUsername);
                        setPatientUsername(a.PatientUsername);
                        
                      }}
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        setRescheduleDate(a.Date);
                        setFilterModalCancel(true);
                        setTimeH(a.TimeH);
                        setTimeM(a.TimeM);
                        setDocUser(a.DoctorUsername);
                        setPatientUsername(a.PatientUsername);
                      }}
                    >
                      Cancel
                    </button>
                    
                  </div>
                );
                else 
              return(<div></div>)}
              })
            : appointmentDate.map((a, index) => {
              {if(a.Availability == "Reserved") 
                return (
                  <div>
                  <div key={index}>
                    <p>Patient name: {a.PatientUsername}</p>
                    <p>Status: {a.Status}</p>
                    <p>Appointment Date:{a.Date.toString().split("T")[0]}</p>
                    <p>
                      Time: {a.TimeH}:{a.TimeM}
                    </p>
                  </div>
                  <button
                      onClick={() => {
                        setFilterModal(true);
                        setRescheduleDate(a.Date);
                        setTimeH(a.TimeH);
                        setTimeM(a.TimeM);
                        setDocUser(a.DoctorUsername);
                        setPatientUsername(a.PatientUsername);
                      }}
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        setRescheduleDate(a.Date);
                        setFilterModalCancel(true);
                        setTimeH(a.TimeH);
                        setTimeM(a.TimeM);
                        setDocUser(a.DoctorUsername);
                        setPatientUsername(a.PatientUsername);
                      }}
                    >
                      Cancel
                    </button>
                    {/* {filterModalCancel ? (
                      <FilterModal>
                        <div className="speciality-filter">
                          <p>Are sure you want to cancel the appointment?</p>
                        </div>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                            handleCancel();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                          }}
                        >
                          Cancel
                        </button>
                      </FilterModal>
                    ) : null}

                    {filterModal ? (
                      <FilterModal>
                        <div className="speciality-filter">
                          {appointmentNew.map((a, newindex) => {
                            return (
                              <label
                                id={a}
                                key={newindex}
                                onClick={() => {
                                  setNewDocUser(a.DoctorUsername);
                                  setNewTimeH(a.TimeH);
                                  setNewTimeM(a.TimeM);
                                  setNewdate(a.Date);
                                  console.log(patientUsername);
                                }}
                              >
                                <p>{a.Date.toString().split("T")[0]}</p>
                                <p>
                                  {a.TimeH}:{a.TimeM}
                                </p>
                              </label>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => {
                            setFilterModal(false);
                            handleReschedule();
                            handleReschedule2();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModal(false);
                          }}
                        >
                          Cancel
                        </button>
                      </FilterModal>
                    ) : null} */}
                  </div>
                );
              else 
              return(<div></div>)}
              })}
        </div>
      </div>
    );
  }
}
