import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
<<<<<<< Updated upstream
import GetDoctors from "./getDoctors";
import GetAppointments from "./getAppoinments";
import axios from "axios";
=======
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
import PayButton from "../Packages/PayButton";
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
>>>>>>> Stashed changes

export default function Doctors() {
  const [speciality, setSpeciality] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
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
  const handleSubmit2 = async (e, doctor, Date, TimeH, TimeM) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/updateAppointment`, {
      DoctorUsername: doctor,
      Date: Date,
      TimeH: TimeH,
      TimeM: TimeM,
      Availability: "Reserved",
      PatientUsername: sessionStorage.getItem("Username"),
    });
  };
<<<<<<< Updated upstream
  console.log(appointmentDate);
=======

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
>>>>>>> Stashed changes

  if (Doc || appointmentDate) {
    console.log(appointmentDate);
    return (
      <div className="PatientHome Bootstrap">
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
<<<<<<< Updated upstream
        <div className="form-prescription">
          <label htmlFor="">Speciality</label>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setSpeciality(e.target.value);
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
=======

        <div className="form-view-doctors-by-patient">
          <div className="form-view-doctors-by-patient-div">
            <label htmlFor="">Doctor</label>
            <input
              type="text"
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
            <FontAwesomeIcon
              icon={faFilter}
              className="filter-icon fa-2x"
              onClick={() => {
                setFilterModal(true);
              }}
            />
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setSpeciality(e.target.value);
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
                            document.querySelectorAll(".selected-label-filter")
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <div key={index}>
                <p>Name: {a.Doctor.Name}</p>
                <p>Speciality: {a.Doctor.Speciality}</p>
                <p>Session Price/hour: {a.Doctor.Hourlyrate}</p>
                <p>Hospital: {a.Doctor.Affiliation}</p>
                <p>Education: {a.Doctor.Education}</p>
                <p>Date: {a.Date}</p>
                <p>Hour: {a.TimeH}</p>
                <p>Minute: {a.TimeM}</p>
                <button
                  onClick={(e) =>
=======
              <div className="appointment-details-container" key={index}>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Name</span> <span>{a.Doctor.Name}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Speciality</span> <span>{a.Doctor.Speciality}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Session Price/hour</span>{" "}
                  <span>{parseInt(a.Doctor.Hourlyrate * 1.1)}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Hospital</span> <span>{a.Doctor.Affiliation}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Education</span> <span>{a.Doctor.Education}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Date</span>
                  <span>{a.Date.toString().split("T")[0]}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Time</span>
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
>>>>>>> Stashed changes
                    handleSubmit2(
                      e,
                      a.Doctor.Username,
                      a.Date,
                      a.TimeH,
                      a.TimeM
<<<<<<< Updated upstream
                    )
                  }
                >
                  reserve
                </button>
=======
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
                        Session price: {parseInt(a.Doctor.Hourlyrate * 1.1)} EGP
                      </p>
                      <p>discount: {discount3}%</p>
                      <p>
                        total ={" "}
                        {parseInt(
                          a.Doctor.Hourlyrate * 1.1 * ((100 - discount3) / 100)
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
>>>>>>> Stashed changes
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
