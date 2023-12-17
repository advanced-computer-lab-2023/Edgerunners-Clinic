import Logo from "../../UI/UX/Logo";
import axios from "axios";
import { useRef, useState } from "react";
import getDoctor from "./findDoctorFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUser,
  faCalendarDays,
  faSignature,
  faEnvelopeCircleCheck,
  faMoneyBillWave,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import MyWalletD from "./MyWalletD";

function EditMyProf(props) {
  let result = getDoctor();
  const Username = result.Username;
  const pass = result.Password;
  const dob = result.DOB;
  const name = result.Name;
  const email = result.Email;
  const hour = result.Hourlyrate;
  const aff = result.Affiliation;
  const emailRef = useRef();
  const hourRef = useRef();
  const affRef = useRef();
  const [emailTB, setEmailTB] = useState(false);
  const [hourTB, setHourTB] = useState(false);
  const [affTB, setAffTB] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const showTooltip = (e) => {
    setVisible(true);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  function editHourlyRate(event) {
    setHourTB(true);
    if (hourRef.current.value !== "" && hourTB) {
      const sentData = {
        Username: Username,
        Hourlyrate: hourRef.current.value,
      };

      axios
        .put("http://localhost:3005/updateDoctor", sentData, {})
        .then((res) => {
          setHourTB(false);
        })
        .catch((error) => {});
    }
  }
  function editAff(event) {
    setAffTB(true);
    if (affRef.current.value !== "" && affTB) {
      const sentData = {
        Username: Username,
        Affiliation: affRef.current.value,
      };

      axios
        .put("http://localhost:3005/updateDoctor", sentData, {})
        .then((res) => {
          setAffTB(false);
        })
        .catch((error) => {});
    }
  }
  function editEmail(event) {
    setEmailTB(true);
    if (emailRef.current.value !== "" && emailTB) {
      console.log(Username);
      console.log(emailRef.current.value);
      const sentData = { Username: Username, Email: emailRef.current.value };
      axios
        .put("http://localhost:3005/updateDoctor", sentData, {})
        .then((res) => {
          setEmailTB(false);
        })
        .catch((error) => {});
    }
  }

  return (
    <div className="Bootstrap DoctorHome">
      <div className="tailwind">
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
                  <a className="nav-link" aria-current="page" href="#pets">
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
                    href="/DoctorAppointments"
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
                  <a className="nav-link" aria-current="page" href="#education">
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#education">
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
                      sessionStorage.removeItem("wallet");
                      sessionStorage.removeItem("Status");
                      window.location.replace("/");
                    }}
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="parent-profile">
        <div>
          <div className="">
            <h3 className="">Welcome.. {name}</h3>
          </div>
          <div className="container-profile">
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faUser} />
                <span>Username</span>
              </div>
              <span>{Username}</span>
            </div>
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span>Birth Date</span>
              </div>
              <span>{dob}</span>
            </div>
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faSignature} />
                <span>Name</span>
              </div>
              <span>{name}</span>
            </div>
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                <span>Email</span>
              </div>
              <div className="container-profile-item-right">
                {email}
                {emailTB && (
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter New E-mail...."
                    ref={emailRef}
                  />
                )}
                <FontAwesomeIcon
                  onMouseMove={showTooltip}
                  onMouseOut={hideTooltip}
                  icon={faPenToSquare}
                  size="xl"
                  className="pentosquare-icon"
                  onClick={editEmail}
                />
              </div>
            </div>
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <span>Hourlyrate</span>
              </div>
              <div className="container-profile-item-right">
                {hour}
                {hourTB && (
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter New Hourly Rate..."
                    ref={hourRef}
                  />
                )}
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onMouseMove={showTooltip}
                  onMouseOut={hideTooltip}
                  size="xl"
                  className="pentosquare-icon"
                  onClick={editHourlyRate}
                />
                {visible && (
                  <div
                    className="tooltip"
                    style={{ top: coords.y + 10, left: coords.x }}
                  >
                    Click to Edit
                  </div>
                )}
              </div>
            </div>
            <div className="container-profile-item">
              <div className="container-profile-item-left">
                <FontAwesomeIcon icon={faAward} />
                <span>Affiliation</span>
              </div>
              <div className="container-profile-item-right">
                {aff}
                {affTB && (
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter Affiliation..."
                    ref={affRef}
                  />
                )}
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onMouseMove={showTooltip}
                  onMouseOut={hideTooltip}
                  size="xl"
                  className="pentosquare-icon"
                  onClick={editAff}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="wallet">
          <div class="wallet-content">
            <h2>Wallet</h2>
          </div>
          <div class="hidden-content">
            <h3>
              <MyWalletD />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditMyProf;
