import { useState, useEffect, useRef } from "react";
import VideoCall from "../VideoCall";
import axios from "axios";


function StartACall() {
  const [patientusername, setPatientUsername] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const patient = useRef();

  const handleCallStart = () => {
    // Perform any necessary actions before starting the call
    setIsCallStarted(true);
  };

  useEffect(() => {
    
    return () => {
      setIsCallStarted(false);
    };
  }, []);

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    
   
  
    const p = patient.current.value;
    const doctorUsername = sessionStorage.getItem("Username");
    const notificationMessage = `Hello ${p}, Dr ${doctorUsername} wants to start a video call with you at ${new Date().toLocaleString()}`;
      try {
      await axios.post("http://localhost:3005/createNotification", {patientUsername:p,message: notificationMessage}
        
        
        );
        
      } catch (error) {
        console.error("Error removing notification:", error);
      }
      
    handleCallStart();
  };
 


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
                    <a className="nav-link" aria-current="page" href="/videocall">
                      Video Call
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/chatd"
                    >
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
                    <a
                      className="nav-link"
                      aria-current="page"
                      href=""
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
      <h1>Choose Your Patient</h1>
      {!isCallStarted ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Patient Username:
            <input
              type="text"
              ref={patient}
              onChange={(e) => setPatientUsername(e.target.value)}
            />
          </label>
          <button type="submit">Start Call</button>
        </form>
      ) : (
        <VideoCall user={patient.current.value} />
      )}
    </div>
  );
}


export default StartACall;
