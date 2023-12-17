import React, { useState } from "react";
import getRelation from "./GetRelation";
import Logo from "../../UI/UX/Logo";
import Footer from "../Patient/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../PatientHome/FilterModal";
import MyWalletP from "./MyWalletP";
import { Link } from "react-router-dom";

export default function ViewFamilyMem() {
  const [WalletModal, setWalletModal] = useState(false);
  const relations = getRelation();
  if (relations.data != null) {
    return (
      <div className="Bootstrap ViewFamilyMem PatientHome">
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
        <div className="header">
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
              <Link to="/patientHome" className="logo-link">
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
                      href="/Chat"
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
                      My Subscribtions
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="event-schedule-area-two bg-color pad100">
          <div className="container">
            <div className="row col-lg-12 section-title text-center title-text">
              <h2>Family Members</h2>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
                    id="home"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center" scope="col">
                              Relation
                            </th>
                            <th scope="col"></th>
                            <th scope="col">Information</th>
                            <th
                              scope="col"
                              className="text-center"
                              width="200px"
                            >
                              National ID
                            </th>
                          </tr>
                        </thead>
                        {relations.data.map((r, index) => {
                          let gender = null;
                          let pic = null;
                          if (r.Relation === "Husband") {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar1.png";
                          } else if (r.Relation === "Wife") {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar8.png";
                          } else if (
                            r.Relation === "Child" &&
                            r.Gender === "Male"
                          ) {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar7.png";
                          } else {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar3.png";
                          }
                          if (r.Gender === "Male") {
                            gender = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-gender-male"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                                />
                              </svg>
                            );
                          } else {
                            gender = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-gender-female"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                                />
                              </svg>
                            );
                          }
                          return (
                            <tbody key={index}>
                              <tr className="inner-box">
                                <th scope="row">
                                  <h2 className="text-center">{r.Relation}</h2>
                                </th>
                                <td>
                                  <div className="event-img">
                                    <img src={pic} alt="" />
                                  </div>
                                </td>
                                <td>
                                  <div className="event-wrap">
                                    <h2>{r.Name}</h2>
                                    {gender}
                                  </div>
                                </td>
                                <td>
                                  <div className="r-no">
                                    <h2> {r.NationalID}</h2>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="primary-btn text-center">
                  <a href="/NewFamilyMem" className="btn btn-primary">
                    Add Family Member
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="customfooter">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
