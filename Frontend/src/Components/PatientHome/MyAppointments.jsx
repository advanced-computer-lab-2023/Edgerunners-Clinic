import React, { useEffect, useState } from "react";
import Logo from "../../UI/UX/Logo";
import {
  FilterAppointmentsDate,
  FilterAppointmentsStatus,
  GetAppointmentsFilter,
} from "./getAppoinments";
import FilterModal from "./FilterModal";
import GetAppointments from "./getAppoinments";
import GetRelation from "./getRelation";
import axios from "axios";
import Footer from "../Patient/Footer";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 1,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
  textAlign: "center",
  zIndex: 2, // Set a higher value to overlap the overlay
};

export default function PatientAppointments() {
  const [state, setState] = useState();
  const [which, setWhich] = useState(false);
  const PatientUsername = sessionStorage.getItem("Username");
  const [name, setName] = useState();
  const [filterModal, setFilterModal] = useState(false);
  const [filterModalCancel, setFilterModalCancel] = useState(false);
  const [filterModalFollowUp, setfilterModalFollowUp] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  let appointmentStatus = FilterAppointmentsStatus({
    Status: state,
    PatientUsername: PatientUsername,
  });

  let appointmentDate = FilterAppointmentsDate({
    Date: date,
    PatientUsername: PatientUsername,
  });

  let appointmentNew = GetAppointmentsFilter({
    DoctorUsername: docUser,
  });

  const handleSubmit = async (e) => {
    e.preventDefaut();
    appointmentDate = FilterAppointmentsDate({
      Date: date,
      PatientUsername: PatientUsername,
    });
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    appointmentStatus = FilterAppointmentsStatus({
      Status: state,
      PatientUsername: PatientUsername,
    });
  };

  const handleReschedule = async (e) => {
    await axios.put("http://localhost:3001/rescheduleAppointment", {
      DoctorUsername: docUser,
      PatientUsername: PatientUsername,
      Date: rescheduleDate,
      TimeH: timeH,
      TimeM: timeM,
    });
  };

  const handleFollowUp = async (e) => {
    await axios.post("http://localhost:3001/createFURP", {
      DoctorUsername: newdocUser,
      PatientUsername: PatientUsername,
      Date: newdate,
      TimeH: newtimeH,
      TimeM: newtimeM,
      NationalID: nationalid,
    });
  };

  const handleCancel = async (e) => {
    console.log(docUser);
    await axios.put("http://localhost:3001/cancelAppointment", {
      DoctorUsername: docUser,
      PatientUsername: PatientUsername,
      Date: rescheduleDate,
      TimeH: timeH,
      TimeM: timeM,
    });
  };

  useEffect(() => {}, [newdocUser, newdate, newtimeH, newtimeM, nationalid]);
  const handleReschedule2 = async (e) => {
    await axios.put("http://localhost:3001/updateAppointment", {
      DoctorUsername: newdocUser,
      Date: newdate,
      TimeH: newtimeH,
      TimeM: newtimeM,
      Availability: "Reserved",
      Status: "Rescheduled",
      PatientUsername: sessionStorage.getItem("Username"),
      NationalID: nationalid,
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
                    href="/myAppointments"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/viewPackage"
                  >
                    My Subscriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/Prescriptions"
                  >
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/myWalletP">
                    My Wallet
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/changePassword"
                  >
                    Change password
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      sessionStorage.removeItem("Username");
                      sessionStorage.removeItem("type");
                      sessionStorage.removeItem("token");
                      window.location.replace("/");
                    }}
                  >
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
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="./resources/consultant .jpg"
            alt=""
          />
        <div style={{ marginTop: "-20rem" }} className="form-prescription">
        <div  style = {{ backgroundColor:"rgb(168, 191, 225)", marginLeft: "100px"}}className="form-view-patients-by-doctor">
        <div className="form-view-doctors-by-patient-div">
          <label htmlFor="">Status</label>
          <select style={{borderRadius : "20px"}}
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
          </div>
          <div>
          <label  style={{marginRight:"10px"}} htmlFor="">Date</label>
          <input style={{borderRadius : "20px"}}
            type="date"
            name=""
            id=""
            onChange={(e) => {
              setDate(e.target.value);
              setWhich(false);
            }}
          />
          </div>
        </div>
        </div>
        </div>
        {filterModalCancel ? (
          <FilterModal>
            <div className="speciality-filter">
              <p>Are sure you want to cancel the appointment?</p>
            </div>
            <button 
              onClick={() => {
                setFilterModalCancel(false);
                setSelectedAppointment(null);
                handleCancel();
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setFilterModalCancel(false);
                setSelectedAppointment(null);
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
                setSelectedAppointment(null);
                handleReschedule();
                handleReschedule2();
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setFilterModal(false);
                setSelectedAppointment(null);
              }}
            >
              Cancel
            </button>
          </FilterModal>
        ) : null}

        {filterModalFollowUp ? (
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
                setfilterModalFollowUp(false);
                setSelectedAppointment(null);
                handleFollowUp();
              }}
            >
              Send request
            </button>
            <button
              onClick={() => {
                setfilterModalFollowUp(false);
                setSelectedAppointment(null);
              }}
            >
              Cancel
            </button>
          </FilterModal>
        ) : null}

        <div  style={{marginTop:"1.5rem"}} class="row">
          {which
            ? appointmentStatus.map((appstatus, index) => {
                return (
                  <div class="col-sm-3 py-2">
                    <div class="card h-100 border-primary bg-gr">
                      <div class="card-body">
                        <div key={index}>
                          <p>Name: {appstatus.DoctorUsername}</p>
                          <p>Availability: {appstatus.Availability}</p>
                          <p>Status: {appstatus.Status}</p>
                          <p>
                            Appointment Date:{" "}
                            {appstatus.Date.toString().split("T")[0]}
                          </p>
                          <p>
                            Time: {appstatus.TimeH}:{appstatus.TimeM}
                          </p>
                          {appstatus.NationalID !== "" && (
                            <p>Family Member: {appstatus.NationalID}</p>
                          )}
                          {appstatus.Status == "Completed" ? (
                            <>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setfilterModalFollowUp(true);
                                  setnationalid(appstatus.NationalID);
                                }}
                              >
                                Follow up
                              </button>
                            </>
                          ) : (
                            <>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setFilterModal(true);
                                  setRescheduleDate(appstatus.Date);
                                  setTimeH(appstatus.TimeH);
                                  setTimeM(appstatus.TimeM);
                                  setDocUser(appstatus.DoctorUsername);
                                }}
                              >
                                Reschedule
                              </button>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setRescheduleDate(appstatus.Date);
                                  setFilterModalCancel(true);
                                  setTimeH(appstatus.TimeH);
                                  setTimeM(appstatus.TimeM);
                                  setDocUser(appstatus.DoctorUsername);
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : appointmentDate.map((app, index) => {
                return (
                  <div class="col-sm-3 py-2">
                    <div class="card h-100 border-primary bg-gr">
                      <div class="card-body">
                        <div key={index}>
                          <p>Doctor name: {app.DoctorUsername}</p>
                          <p>Status: {app.Status}</p>
                          <p>
                            Appointment Date:{" "}
                            {app.Date.toString().split("T")[0]}
                          </p>
                          <p>
                            Time: {app.TimeH}:{app.TimeM}
                          </p>
                          {app.NationalID !== "" && (
                            <p>Family Member: {app.NationalID}</p>
                          )}
                          {app.Status == "Completed" ? (
                            <>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setfilterModalFollowUp(true);
                                  setnationalid(appstatus.NationalID);
                                }}
                              >
                                Follow up
                              </button>
                            </>
                          ) : (
                            <>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setSelectedAppointment(app);
                                  setFilterModal(true);
                                  setRescheduleDate(app.Date);
                                  setTimeH(app.TimeH);
                                  setTimeM(app.TimeM);
                                  setDocUser(app.DoctorUsername);
                                }}
                              >
                                Reschedule
                              </button>
                              <button class="btn btn-outline-secondary"
                                onClick={() => {
                                  setRescheduleDate(app.Date);
                                  setFilterModalCancel(true);
                                  setTimeH(app.TimeH);
                                  setTimeM(app.TimeM);
                                  setDocUser(app.DoctorUsername);
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {/* {filterModalCancel ? (
                      <FilterModal>
                        <div className="speciality-filter">
                          <p>Are sure you want to cancel the appointment?</p>
                        </div>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                            setSelectedAppointment(null);
                            handleCancel();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModalCancel(false);
                            setSelectedAppointment(null);
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
                            setSelectedAppointment(null);
                            handleReschedule();
                            handleReschedule2();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFilterModal(false);
                            setSelectedAppointment(null);
                          }}
                        >
                          Cancel
                        </button>
                      </FilterModal>
                    ) : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
