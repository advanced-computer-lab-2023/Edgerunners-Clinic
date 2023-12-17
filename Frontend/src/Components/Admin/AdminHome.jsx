import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../UI/UX/Logo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faPeopleGroup,
  faCalendarCheck,
  faStethoscope,
  faHandHoldingMedical,
  faCircleXmark,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../PatientHome/FilterModal";
import SetAdmin from "./SetAdmin";
import RemoveUser from "./RemovePar";
import CreatePackage from "../Packages/CreatePackage";
import Footer from "../Patient/Footer";

export default function AdminHome() {
  const [isModalSetAdminOpen, setIsModalSetAdminOpen] = useState(false);
  const [isModalRemoveUserOpen, setIsModalRemoveUserOpen] = useState(false);
  const [isModalCreatePackageOpen, setIsModalCreatePackageOpen] =
    useState(false);
  //const [isUwU, setIsUwU] = useState(false);
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
            <span className="clinicText">El-7a2ny Clinic</span>
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
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalSetAdminOpen(true);
                    }}
                  >
                    Add Admin
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalRemoveUserOpen(true);
                    }}
                  >
                    Remove User
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/updatePackage"
                  >
                    Update Packages
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalCreatePackageOpen(true);
                    }}
                  >
                    Add Packages
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
          <div
            className="col-4"
            onClick={() => {
              setIsModalSetAdminOpen(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a>
              <h3>Add Admin</h3>
            </a>

            <p>Add a new admin to the system</p>
          </div>

          <div
            className="col-4"
            onClick={() => {
              setIsModalRemoveUserOpen(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a>
              <h3>Remove User</h3>
            </a>
            <p>Remove patient, doctor, or admin from the system</p>
          </div>

          <div className="col-4" onClick={() => handleClick("/DoctorRequests")}>
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a>
              <h3>View Doctor Requests</h3>
            </a>
            <p>View doctors trying to join the system</p>
          </div>
          <div
            className="col-4"
            onClick={() => {
              setIsModalCreatePackageOpen(true);
            }}
          >
            <FontAwesomeIcon
              icon={faStethoscope}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a>
              <h3>Create Packages</h3>
            </a>
            <p>Create a new health package</p>
          </div>
          <div className="col-4" onClick={() => handleClick("/UpdatePackage")}>
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a>
              <h3>Update Package</h3>
            </a>
            <p>Edit a health package</p>
          </div>
          <div className="col-4" onClick={() => handleClick("/UpdatePackage")}>
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
      {isModalSetAdminOpen ? (
        <FilterModal>
          <FontAwesomeIcon
            className="circleXmark"
            icon={faCircleXmark}
            onClick={() => {
              setIsModalSetAdminOpen(false);
            }}
          />
          <SetAdmin />
          {/*<div>Test component</div>*/}
        </FilterModal>
      ) : null}
      {isModalRemoveUserOpen ? (
        <FilterModal>
          <FontAwesomeIcon
            className="circleXmark"
            icon={faCircleXmark}
            onClick={() => {
              setIsModalRemoveUserOpen(false);
            }}
          />
          <RemoveUser />
          {/*<div>Test component</div>*/}
        </FilterModal>
      ) : null}
      {isModalCreatePackageOpen ? (
        <FilterModal>
          <FontAwesomeIcon
            className="circleXmark"
            icon={faCircleXmark}
            onClick={() => {
              setIsModalCreatePackageOpen(false);
            }}
          />
          <CreatePackage />
          {/*<div>Test component</div>*/}
        </FilterModal>
      ) : null}
      <Footer></Footer>
    </div>
  );
}
