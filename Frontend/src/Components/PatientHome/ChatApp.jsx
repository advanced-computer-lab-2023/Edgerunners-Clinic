// ChatComponent.js
import React, { useState, useEffect } from "react";
import { fetchDoctors } from "./fetchChat";
import ChatBox from "./ChatBox";
import Logo from "../../UI/UX/Logo";

const ChatApp = () => {
  const [sender, setSender] = useState(sessionStorage.getItem("Username")); // Set the sender's username
  const [receiver, setReceiver] = useState(); // Set the receiver's username

  const [chatMessages, setChatMessages] = useState([]);

  const [isChatOpen, setChatOpen] = useState(false);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  const d = fetchDoctors();
  console.log(d);

  if (d) {
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
                      href="/myWalletP"
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
        <div style={{ marginTop: "8rem" }}>
          <select
            style={{
              borderRadius: "10px",
              marginLeft: "1rem",
            }}
            name=""
            id=""
            onChange={(e) => {
              setReceiver(e.target.value);
            }}
          >
            {d.map((doctor, index) => (
              <option key={index} value={doctor.Username}>
                {doctor.Username}
              </option>
            ))}
          </select>
          <button
            style={{
              borderRadius: "10px",
              backgroundColor: "green",
              marginLeft: "1rem",
            }}
            onClick={() => {
              openChat();
            }}
          >
            Chat With..{receiver}
          </button>
        </div>
        {isChatOpen ? (
          <ChatBox
            chatMessages={chatMessages}
            receiver={receiver}
            sender={sender}
          />
        ) : null}
        <button
          style={{
            borderRadius: "10px",
            backgroundColor: "red",
            marginLeft: "1rem",
            marginTop: "1rem",
          }}
          onClick={() => {
            closeChat();
          }}
        >
          Close
        </button>
      </div>
    );
  }
};

export default ChatApp;
