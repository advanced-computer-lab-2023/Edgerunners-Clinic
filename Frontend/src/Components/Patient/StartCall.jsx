import { useState, useEffect, useRef } from "react";
import VideoCall from "../VideoCall";
import axios from "axios";

function StartCall() {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const videoCallRef = useRef();
  const doctor = useRef();
  const handleCallStart = () => {
    // Perform any necessary actions before starting the call
    setIsCallStarted(true);
  };

  useEffect(() => {
    return () => {
      setIsCallStarted(false);
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const patientUsername = sessionStorage.getItem("Username");
    const d = doctor.current.value;
    console.log(d);

    const notificationMessage = `Hello Dr ${d},  ${patientUsername} wants to start a video call with you at ${new Date().toLocaleString()}`;
    console.log(notificationMessage);
    try {
      await axios.post("http://localhost:3005/createNotification", {
        doctorUsername: d,
        message: notificationMessage,
      });
    } catch (error) {
      console.error("Error removing notification:", error);
    }

    handleCallStart();
  };

  return (
    <div className="Bootstrap PatientHome">
      <div style={{ position: "sticky", top: 0 }} className="header">
        <nav
          style={{ position: "relative" }}
          className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg"
        >
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
                  <a className="nav-link" aria-current="page" href="/VideoCall">
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
      <h1>Choose Your Doctor</h1>
      {!isCallStarted ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Doctor Username:
            <input type="text" ref={doctor} />
          </label>
          <button type="submit">Start Call</button>
        </form>
      ) : (
        <VideoCall doctorusername={doctor.current.value} />
      )}
    </div>
  );
}

export default StartCall;
