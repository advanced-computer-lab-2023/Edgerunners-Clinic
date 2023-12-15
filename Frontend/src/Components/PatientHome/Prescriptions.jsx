import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import GetPrescriptions from "./getPrescriptions";
import html2pdf from 'html2pdf.js';

export default function Prescriptions() {
  const [date, setDate] = useState();
  const [doctor, setDoctor] = useState();
  const [status, setStatus] = useState();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  console.log("date is: " + date);
  let Prescriptions = GetPrescriptions({
    Patient: sessionStorage.getItem("Username"),
    Date: date,
    Doctor: doctor,
    Status: status,
  });

  const downloadPrescriptionAsPDF = (prescription) => {
    // Create a div element with the prescription details
    const prescriptionDiv = document.createElement('div');
    prescriptionDiv.innerHTML = `
      <h2>Patient: ${prescription.Patient}</h2>
      <p>Status: ${prescription.Status}</p>
      <p>Doctor: ${prescription.Doctor}</p>
      <p>Date: ${new Date(prescription.Date).toLocaleDateString()}</p>
      <p>Submitted: ${prescription.Submitted ? 'Yes' : 'No'}</p>
      <h4>Required Medicines:</h4>
      <ul>
        ${prescription.RequiredMedicines.map((medicine) => `<li>${medicine.name} - ${medicine.dose}</li>`).join('')}
      </ul>
    `;
  
    // Convert the div to a PDF using html2pdf
    html2pdf(prescriptionDiv, {
      margin: 10,
      filename: 'prescription.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
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
        <div className="header">
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
            <a href="/PatientHome"><Logo /></a>
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
                <button onClick={() => downloadPrescriptionAsPDF(p)}>Download</button>
              </a>)}
              <button onClick={() => handleSelect(index)}>
              {selectedPrescriptions[index] ? "Deselect" : "Select"}

             </button>

              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
