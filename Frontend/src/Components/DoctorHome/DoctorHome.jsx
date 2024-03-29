import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../UI/UX/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faPeopleGroup,
  faCalendarCheck,
  faStethoscope,
  faCircleXmark,
  faHandHoldingMedical,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../PatientHome/FilterModal.jsx";
import AddAppointment from "./AddAppointment";
import ScheduleAppointment from "./ScheduleAppointment.jsx";
import Footer from "./Footer.jsx";
import FollowUpRequests from "./FollowUpRequest.jsx";

export default function DoctorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFollowUp, setIsModalOpenFollowUp] = useState(false);
  const [modalFollowupRequests, setmodalFollowupRequests] = useState(false);
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
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
            <div className="navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/videocall">
                    Video Call
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ChatAppDtoP">
                    Chat Pharma
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ChatD">
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/DoctorAppointments"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/Notification">
                    Notification
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewPresc">
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setmodalFollowupRequests(true)}
                  >
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
                      sessionStorage.removeItem("Status");
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
        <div className="information-div-doctor">
          <div className="welcome-div">
            <h1>Welcome To</h1>
            <h1>
              <span className="clinic-name">El-7a2ny </span>Medical Clinic
            </h1>
          </div>
          <div className="doctor-img-div">
            <img
              className="doctor-img"
              src="../resources/doctor.png"
              alt="washing machine doctor image"
            />
          </div>
        </div>
      </div>
      <div className="body-doctor">
        <div className="description first">
          <FontAwesomeIcon
            className="icon"
            icon={faBedPulse}
            size="5x"
            style={{ color: "#1860dc" }}
          />
          <h3>Header 1</h3>
          <p>
            El7a2ny is a software solution for clinics, doctors, pharmacists and
            patients alike to streamline and automate the interactions between
            patients, medical doctors and pharmacists
          </p>
        </div>
        <div className="description second">
          <FontAwesomeIcon
            className="icon"
            icon={faUserDoctor}
            size="5x"
            style={{ color: "#1860dc" }}
          />
          <h3>Header 2</h3>
          <p>
            El7a2ny encompasses everything from trying to find a doctor,
            scheduling meetings with doctors, conducting on-premise or online
            meetings, getting prescriptions, getting reminders for follow-ups,
            accessing medical history, and ordering medication that was
            prescribed
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="headers">
          <h3>Choose Our Any Services</h3>
          <h3>What You Need..</h3>
        </div>
        <div className="footer-in row">
          <div className="col-4" onClick={() => {
            handleClick("/viewpresc");
          }}>
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="4x"
              style={{ color: "#82d76a" }}
            />

            <h3>View Prescription</h3>

            <p>View and edit prescriptions</p>
          </div>

          <div
            className="col-4"
            onClick={() => {
              setIsModalOpenFollowUp(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Schedule a Follow-Up</h3>
            <p>schedule a follow-up for a patient</p>
          </div>
          <div
            className="col-4"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Add Appointment</h3>
            <p>Add an Appointment</p>
          </div>
          <div
            className="col-4"
            onClick={() => {
              handleClick("/ViewMyPatients");
            }}
          >
            <FontAwesomeIcon
              icon={faStethoscope}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>My Patients</h3>
            <p>view a list of all patients</p>
          </div>
          <div
            className="col-4"
            onClick={() => {
              handleClick("/EditMyProf");
            }}
          >
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>My Wallet</h3>
            <p>View the Amount Available in My Wallet</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Pharmacy</h3>
            <p>view the available quantity, and sales of each medicine</p>
          </div>
        </div>
      </div>
      <div>
        {isModalOpen ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
            <AddAppointment />
          </FilterModal>
        ) : null}
      </div>
      <div>
        {isModalOpenFollowUp ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setIsModalOpenFollowUp(false);
              }}
            />
            <ScheduleAppointment />
          </FilterModal>
        ) : null}
        {modalFollowupRequests ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setmodalFollowupRequests(false);
              }}
            />
            <FollowUpRequests />
          </FilterModal>
        ) : null}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
