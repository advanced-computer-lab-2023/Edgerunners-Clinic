import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import { Link } from "react-router-dom";
import GetPrescriptions from "./getPrescriptions";
import html2pdf from "html2pdf.js";
import Footer from "../Patient/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import MyWalletP from "../Patient/MyWalletP";
import FilterModal from "./FilterModal";
import axios from "axios";

export default function Prescriptions() {
  const [date, setDate] = useState();
  const [doctor, setDoctor] = useState();
  const [status, setStatus] = useState();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [WalletModal, setWalletModal] = useState(false);

  console.log("date is: " + date);
  let Prescriptions = GetPrescriptions({
    Patient: sessionStorage.getItem("Username"),
    Date: date,
    Doctor: doctor,
    Status: status,
  });
  console.log(Prescriptions);

  const handlePayment = async (index) => {
    let pay = Prescriptions[index].RequiredMedicines;
    let arr = [];
    for (let i = 0; i < pay.length; ++i) {
      const res = await axios.get(`http://localhost:3005/getmedicine`, {
        params: { Name: pay[i].name },
      });
      console.log(res.data[0].Name);
      arr.push({
        medicinename: res.data[0].Name,
        count: 1,
        price: res.data[0].Price,
        totalprice: res.data[0].Price,
      });
    }
    console.log(arr);
    axios.put("http://localhost:3005/updateCart", {
      arr,
      username: sessionStorage.getItem("Username"),
    });
     window.location.href = "http://localhost:5173/Cart";
  };

  const downloadPrescriptionAsPDF = (prescription) => {
    // Create a div element with the prescription details
    const prescriptionDiv = document.createElement("div");
    prescriptionDiv.innerHTML = `
      <h2>Patient: ${prescription.Patient}</h2>
      <p>Status: ${prescription.Status}</p>
      <p>Doctor: ${prescription.Doctor}</p>
      <p>Date: ${new Date(prescription.Date).toLocaleDateString()}</p>
      <p>Submitted: ${prescription.Submitted ? "Yes" : "No"}</p>
      <h4>Required Medicines:</h4>
      <ul>
        ${prescription.RequiredMedicines.map(
          (medicine) => `<li>${medicine.name} - ${medicine.dose}</li>`
        ).join("")}
      </ul>
    `;

    // Convert the div to a PDF using html2pdf
    html2pdf(prescriptionDiv, {
      margin: 10,
      filename: "prescription.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Prescriptions = await GetPrescriptions({
      Patient: sessionStorage.getItem("Username"),
      Date: date,
      Doctor: doctor,
      Status: status,
    });
  };
  const handleSelect = (index) => {
    setSelectedPrescriptions((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const Selected = false;

  if (Prescriptions) {
    console.log(Prescriptions);
    return (
      <div className="Bootstrap PatientHome">
        <div style={{ position: 'sticky', top: 0 }} className="header">
          <nav style={{ position: 'relative' }} className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
             <Link to="/PatientHome" className="logo-link">
               <Logo />
               <span className="clinicText">El-7a2ny Clinic</span>
             </Link>

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
                    <a
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setWalletModal(true)}
                    >
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

        <div style={{ position: "static" }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="./resources/pills.jpg"
            alt=""
          />
          <div style={{ marginTop: "-20rem" }} className="form-prescription">
            <div
              style={{
                backgroundColor: "rgb(168, 191, 225)",
                marginLeft: "70px",
              }}
              className="form-view-patients-by-doctor"
            >
              <div className="form-view-doctors-by-patient-div">
                <label htmlFor="">Doctor</label>
                <input
                  type="text"
                  placeholder="Do You Know A Doctor's Name..?"
                  onChange={(e) => {
                    setDoctor(e.target.value);
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
              <div>
                <label
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  htmlFor=""
                >
                  All
                </label>
                <input
                  type="radio"
                  name="status"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStatus("");
                    }
                  }}
                />
                <label
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  htmlFor=""
                >
                  Unfilled
                </label>
                <input
                  type="radio"
                  name="status"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStatus("Unfilled");
                    }
                  }}
                />
                <label
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  htmlFor=""
                >
                  Filled
                </label>
                <input
                  type="radio"
                  name="status"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStatus("Filled");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: " -2rem" }} class="row">
          {Prescriptions.map((p, index) => {
            return (
              <div class="col-sm-3 py-2">
                <div class="card h-100 border-primary bg-gr">
                  <div class="card-body">
                    <h3 class="card-title">Prescription</h3>
                    <a>{p.Patient}</a>
                    <br />
                    <a>{p.Status}</a>
                    <br />
                    <a>{p.Doctor}</a>
                    <br />
                    <a>{p.Date.toString().split("T")[0]}</a>
                    <br />
                    {selectedPrescriptions[index] && (
                      <a>
                        Required Medicines:
                        <ul>
                          {p.RequiredMedicines.map((medicine, index) => (
                            <li key={index}>
                              {medicine.name} - {medicine.dose}
                            </li>
                          ))}
                        </ul>
                        <button
                          class="btn btn-outline-secondary"
                          onClick={() => handlePayment(index)}
                        >
                          Pay
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          onClick={() => downloadPrescriptionAsPDF(p)}
                        >
                          Download
                        </button>
                      </a>
                    )}
                    <button
                      class="btn btn-outline-secondary"
                      onClick={() => handleSelect(index)}
                    >
                      {selectedPrescriptions[index] ? "Deselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {WalletModal ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setWalletModal(false);
              }}
            />
            <MyWalletP />
          </FilterModal>
        ) : null}
        <Footer></Footer>
      </div>
    );
  }
}
