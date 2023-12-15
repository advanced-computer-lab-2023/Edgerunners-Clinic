import React, { useState, useEffect } from "react";
import Logo from "../../UI/UX/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCreditCard,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";
import GetDoctors, { GetSpecialities } from "./getDoctors";
import GetAppointments from "./getAppoinments";
import axios from "axios";
import GetRelation from "./getRelation";
import "./PatientHome.scss";

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

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

export default function Doctors() {
  const [speciality, setSpeciality] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [chosen, setChosen] = useState();
  const [Modal, setModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  function discount() {
    const [discount, setDiscount] = useState();
    useEffect(() => {
      getMyDiscount();
      async function getMyDiscount() {
        const res = await axios.get(
          `http://localhost:3001/getDiscountSession`,
          { params: { username: sessionStorage.getItem("Username") } }
        );
        setDiscount(res.data);
      }
    }, []);
    return discount;
  }
  let discount3 = discount();

  function wallet() {
    const [wallet, setWallet] = useState();
    useEffect(() => {
      getMyWallet();
      async function getMyWallet() {
        const res = await axios.get(
          `http://localhost:3001/getWallet/${sessionStorage.getItem(
            "Username"
          )}`
        );
        setWallet(res.data);
      }
    }, []);
    return wallet;
  }
  let totalAmount = wallet();

  let Specialities = GetSpecialities();
  let Relation = GetRelation({
    Username: sessionStorage.getItem("Username"),
  });

  let Doc = GetDoctors({
    Speciality: speciality,
    Name: name,
  });
  let appointmentDate = GetAppointments({
    Date: date,
    Speciality: speciality,
    Name: name,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Doc = await GetDoctors({
      Speciality: speciality,
      Name: name,
    });
    appointmentDate = await GetAppointments({
      Date: date,
      Speciality: speciality,
      Name: name,
    });
  };

  // const handleSubmit2 = async (e, doctor, Date, TimeH, TimeM) => {
  //   e.preventDefault();
  //   let NationalID = "";
  //   if (chosen !== sessionStorage.getItem("Username")) {
  //     NationalID = chosen;
  //   }
  //   await axios.put(`http://localhost:3001/updateAppointment`, {
  //     DoctorUsername: doctor,
  //     Date: Date,
  //     TimeH: TimeH,
  //     TimeM: TimeM,
  //     Availability: "Reserved",
  //     PatientUsername: sessionStorage.getItem("Username"),
  //     NationalID: NationalID,
  //   });
  // };
  const handleSubmit2 = async (e, doctor, Date, TimeH, TimeM) => {
    e.preventDefault();
    let NationalID = "";
    if (chosen && chosen !== sessionStorage.getItem("Username")) {
      NationalID = chosen;
    }
    sessionStorage.setItem("DoctorUsername", doctor);
    sessionStorage.setItem("Date", Date);
    sessionStorage.setItem("TimeH", TimeH);
    sessionStorage.setItem("TimeM", TimeM);
    sessionStorage.setItem("Availability", "Reserved");
    sessionStorage.setItem("NationalID", NationalID);
  };
  const handlePaymentWallet = async (e, doctor, Date, TimeH, TimeM) => {
    e.preventDefault();
    let NationalID = "";
    if (chosen !== sessionStorage.getItem("Username")) {
      NationalID = chosen;
    }
    await axios.put(`http://localhost:3001/updateAppointmentWallet`, {
      DoctorUsername: doctor,
      Date: Date,
      TimeH: TimeH,
      TimeM: TimeM,
      Discount: discount3,
      Availability: "Reserved",
      PatientUsername: sessionStorage.getItem("Username"),
      NationalID: NationalID,
      Status:"Upcoming",
    });
  };

  const handleCheckout = async (name) => {
    let Username = sessionStorage.getItem("Username");
    let PaymentType = "Appointment";
    let discount = null;
    await axios
      .get("http://localhost:3001/getDiscountSession", {
        params: { username: sessionStorage.getItem("Username") },
      })
      .then((res) => {
        discount = res.data;
      });
    if (discount !== null) {
      let coupon = null;
      await axios
        .get("http://localhost:3001/create-coupon", {
          params: { coupon: discount },
        })
        .then((res) => {
          coupon = res.data;
        });
      await axios
        .post("http://localhost:3001/create-checkout-session", {
          name,
          Username,
          PaymentType,
          coupon,
        })
        .then((res) => {
          sessionStorage.setItem("flag", false);
          window.location = res.data.url;
        })
        .catch((err) => console.log(err.message));
    }
  };

  if (Doc || appointmentDate) {
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
        <img
          className="patient-by-doctors-image"
          src="./resources/team-of-doctors.jpg"
          alt=""
        />
        <div className="doctors-parent">
          <div className="form-view-patients-by-doctor">
            <div className="form-view-doctors-by-patient-div">
              <label htmlFor="">Doctor</label>
              <input
                type="text"
                placeholder="Do You Know A Doctor's Name..?"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-view-doctors-by-patient-div">
              <label htmlFor="">Date</label>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="form-view-doctors-by-patient-div">
              <label htmlFor="">Speciality</label>
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => {
                  setSpeciality(e.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={faFilter}
                className="filter-icon fa-2x"
                onClick={() => {
                  setFilterModal(true);
                }}
              />
              {filterModal ? (
                <FilterModal>
                  <div className="speciality-filter">
                    {Specialities.map((speciality, index) => {
                      return (
                        <label
                          id={speciality}
                          key={index}
                          value={speciality}
                          onClick={() => {
                            setSpeciality(speciality);
                            Array.from(
                              document.querySelectorAll(
                                ".selected-label-filter"
                              )
                            ).forEach((el) =>
                              el.classList.remove("selected-label-filter")
                            );
                            document
                              .getElementById("" + speciality)
                              .classList.add("selected-label-filter");
                            var elements = document.getElementsByClassName(
                              "selected-label-filter"
                            );
                            console.log(elements);
                          }}
                        >
                          {speciality}
                        </label>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setFilterModal(false);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setSpeciality();
                      setFilterModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </FilterModal>
              ) : null}
            </div>
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
                <div className="appointment-details-container" key={index}>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Name
                    </span>{" "}
                    <span>{a.Doctor.Name}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Speciality
                    </span>{" "}
                    <span>{a.Doctor.Speciality}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Session Price/hour
                    </span>{" "}
                    <span>{parseInt(a.Doctor.Hourlyrate * 1.1)}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Hospital
                    </span>{" "}
                    <span>{a.Doctor.Affiliation}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Education
                    </span>{" "}
                    <span>{a.Doctor.Education}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Date
                    </span>
                    <span>{a.Date.toString().split("T")[0]}</span>
                  </div>
                  <div className="appointment-details-items">
                    <span className="appointment-details-items-title">
                      Time
                    </span>
                    <span>
                      {a.TimeH}:{a.TimeM}
                    </span>
                  </div>
                  <select onChange={(e) => setChosen(e.target.value)}>
                    <option value={sessionStorage.getItem("Username")}>
                      myself
                    </option>
                    {Relation.data.map((item, index) => {
                      return (
                        <option key={index} value={item.NationalID}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                  Pay:
                  {/* {<PayButton name = {a.Doctor.Name} /> } */}
                  <FontAwesomeIcon
                    className="credit-card-icon"
                    icon={faCreditCard}
                    onClick={(e) => {
                      handleSubmit2(
                        e,
                        a.Doctor.Username,
                        a.Date,
                        a.TimeH,
                        a.TimeM
                      ),
                        handleCheckout(a.Doctor.Name);
                    }}
                  />
                  <FontAwesomeIcon
                    className="wallet-icon"
                    icon={faWallet}
                    onClick={() => setModal(true)}
                  />
                  {Modal && (
                    <div style={modalOverlayStyle}>
                      <div style={modalStyle}>
                        <span
                          style={closeButtonStyle}
                          onClick={() => setModal(false)}
                        >
                          &times;
                        </span>
                        <h2>Checkout:</h2>
                        <p>
                          Your wallet: {totalAmount != undefined && totalAmount}{" "}
                          EGP
                        </p>
                        <p>
                          Session price: {parseInt(a.Doctor.Hourlyrate * 1.1)}{" "}
                          EGP
                        </p>
                        <p>discount: {discount3}%</p>
                        <p>
                          total ={" "}
                          {parseInt(
                            a.Doctor.Hourlyrate *
                              1.1 *
                              ((100 - discount3) / 100)
                          )}
                        </p>
                        <button
                          onClick={(e) => {
                            handlePaymentWallet(
                              e,
                              a.Doctor.Username,
                              a.Date,
                              a.TimeH,
                              a.TimeM
                            );
                            setModal(false);
                          }}
                        >
                          Pay
                        </button>
                        <button
                          onClick={(e) => {
                            setModal(false);
                          }}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
