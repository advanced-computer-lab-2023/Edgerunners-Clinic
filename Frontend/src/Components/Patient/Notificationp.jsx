import { useState, useEffect } from "react";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import VideoCall from "../VideoCall";
import FilterModal from "../PatientHome/FilterModal";
import { Link } from "react-router-dom";
import Footer from "./Footer";
function Notificationp() {
  const [notification, setNotification] = useState([]);
const [joiningCall,setJoiningCall]=useState(false);
const [sure,setSure]=useState(false);
const[message,setMessage]=useState("");
let p="";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = sessionStorage.getItem("Username");
        const response = await axios.get("http://localhost:3005/getNotification",{params:{patientUsername: u}
            
      });

        setNotification(Array.isArray(response.data.notifications) ? response.data.notifications : []);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemove = async () => {
    try {
      await axios.delete("http://localhost:3005/deleteNotification", {
        params: { message: message },
      });

      setSure(false);
      setNotification((prevNotifications) =>
        prevNotifications.filter((notification) => notification.Message !== message)
      );
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  };
  const handleJoinCall = (message, doctorUsername) => {
    if (message.toLowerCase().includes("video call")) {
      setJoiningCall(true);
      p=doctorUsername; // Save Patient_Username for later use
    }
  };

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
      {notification.map((notification) => (
        <div key={notification._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>{notification.Message}</p>

          {notification.Message.toLowerCase().includes("video call") && (
            <button onClick={() => handleJoinCall(notification.Message)}>Join</button>
          )}

          <button onClick={() => {setSure(true);setMessage(notification.Message)}}>Remove</button>
        </div>
      ))}
{sure && <FilterModal>
       <div className=" h-24  mb-4">
       <body>
          Are you sure you want to delete this notification?
        </body>
        <button onClick={() => handleRemove(notification.Patient_Username)}>
          Yes
        </button>
        <button
              onClick={() => {setSure(false);}}
            >
          No
        </button>
       </div>
        </FilterModal>}
      {/* Conditional rendering of VideoCall component */}
      {joiningCall && <VideoCall user={p} />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
      
    </div>
  );
}

export default Notificationp;
