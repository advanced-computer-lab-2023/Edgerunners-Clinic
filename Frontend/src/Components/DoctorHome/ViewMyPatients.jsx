import Logo from "../../UI/UX/Logo";
import { useRef, useState, useEffect } from "react";
import { GetSearchPatients } from "../PatientHome/getDoctors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import UploadHRforPatient from "./UploadHRforPatients";
import FilterModal from "../PatientHome/FilterModal";
import { Button } from "@material-tailwind/react";
import axios from "axios";
function ViewMyPatients(props) {
  const [searchPatient, setPatient] = useState();
  const [searchStatus, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleAddP, setVisibleAddP] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [filterModal, setFilterModal] = useState(false);
  const [presModal, setPresModal] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState([]);

  function prescriptionMedicine() {
    const [medicinedatabase, setmedicinedatabase] = useState([]);
    useEffect(() => {
      getMyMedicine();
      async function getMyMedicine() {
        const res = await axios.get(`http://localhost:3005/getmedicine`);
        setmedicinedatabase(res.data);
      }
    }, []);
    return medicinedatabase;
  }

  let medicinedatabase = prescriptionMedicine();

  let patientUsername = "";
  const showTooltip = (e) => {
    setVisible(true);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  const showTooltipAddP = (e) => {
    setVisibleAddP(true);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const hideTooltipAddP = () => {
    setVisibleAddP(false);
  };

  const handleAddMed = (e) => {
    e.preventDefault();
    setMedicines((prevMedicines) => [
      ...prevMedicines,
      {
        name: medicine,
        dose: dose,
      },
    ]);
    setMedicine("");
    setDose("");
  };

  let myPatients = GetSearchPatients({
    Username: sessionStorage.getItem("Username"),
    Name: searchPatient,
    up: searchStatus,
  });

  const handlepatientusername = async (patientusername) => {
    sessionStorage.setItem("PatientUsername", patientusername);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    myPatients = await GetSearchPatients({
      Username: sessionStorage.getItem("Username"),
      Name: searchPatient,
      up: searchStatus,
    });
    console.log("Updated", myPatients);
  };
  console.log(myPatients);
  const handlConfirmPres = async (patientUsername) => {
    setPresModal(false);

    try {
      // Make axios PUT request
      const currentDate = new Date();
      const response = await axios.post(
        "http://localhost:3005/createPrescriptions",
        {
          Patient: sessionStorage.getItem("PatientUsername"),
          Status: "Unfilled",
          Doctor: sessionStorage.getItem("Username"),
          Date: new Date(),
          Submitted: false,
          RequiredMedicines: medicines,
        }
      );
      console.log(sessionStorage.getItem("Username"));
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
    setMedicines([]);
  };

  if (myPatients) {
    return (
      <div className="Bootstrap DoctorHome">
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
                      Doctors
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
        <div className="form-view-doctors-by-patient">
          <div className="doctors-by-patient-container">
            <img
              className="doctors-by-patient-image"
              src="./resources/11.png"
              alt=""
            />
            <div className="doctors-by-patient-container-in">
              <h3 className="head">View Your Patients</h3>
              <div className="form-view-patients-by-doctors-div">
                <label htmlFor="">Patient Name</label>
                <input
                  className="doctors-by-patient-input"
                  type="text"
                  placeholder="Do You Know A Patient's Name..?"
                  onChange={(e) => {
                    setPatient(e.target.value);
                  }}
                />
              </div>
              <div className="form-view-patients-by-doctors-div">
                <div className="form-view-patients-by-doctors-checkbox">
                  <label htmlFor="">See upcoming appointments</label>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStatus("abdo");
                      } else {
                        setStatus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="view-my-patients">
          {myPatients.map((user, index) => {
            return (
              <div className="appointment-details-container" key={index}>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">Name</span>{" "}
                  <span>{user.Name}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">
                    Gender
                  </span>{" "}
                  <span>{user.Gender}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">
                    E-mail
                  </span>{" "}
                  <span>{user.Email}</span>
                </div>
                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">
                    Birth Date
                  </span>{" "}
                  <span>{user.DOB.toString().split("T")[0]}</span>
                </div>

                <div className="appointment-details-items">
                  <span className="appointment-details-items-title">
                    Phone Number
                  </span>{" "}
                  <span>{user.phoneNumber}</span>
                </div>
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  size="2x"
                  onMouseMove={showTooltip}
                  onMouseOut={hideTooltip}
                  className="NotesMedical-icon"
                  onClick={async () => {
                    handlepatientusername(user.Username), setFilterModal(true);
                  }}
                />
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  size="2x"
                  onMouseMove={showTooltipAddP}
                  onMouseOut={hideTooltipAddP}
                  className="NotesMedical-icon"
                  onClick={async () => {
                    handlepatientusername(user.Username), setPresModal(true);
                  }}
                />

                {visible && (
                  <div
                    className="tooltip"
                    style={{ top: coords.y + 160, left: coords.x - 130 }}
                  >
                    Check Health Records
                  </div>
                )}

                {visibleAddP && (
                  <div
                    className="tooltip"
                    style={{ top: coords.y + 160, left: coords.x - 130 }}
                  >
                    Add New Prescription
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filterModal ? (
          <FilterModal>
            <div className="">
              <UploadHRforPatient />
            </div>
            <button
              onClick={() => {
                setFilterModal(false);
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setFilterModal(false);
              }}
            >
              Cancel
            </button>
          </FilterModal>
        ) : null}
        {presModal ? (
          <FilterModal>
            <form>
              <div>
              <label htmlFor="Patient">Select Medicine</label>
              <select className="labelShape"
                onChange={(e) => {
                  setMedicine(e.target.value);
                }}
              >
              <option>Select Patient</option>
              {medicinedatabase.map((medicine, index) => {
                  return (
                    <option key={index} value={medicine.Name}>
                      {medicine.Name}
                    </option>
                  );
                })}
                </select>
                {/* <label>Medicine Name: </label>
                <input
                  type="text"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                ></input> */}
              </div>
              <div>
                <label>Dose: </label>
                <input
                  type="text"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                ></input>
              </div>
              <button onClick={handleAddMed}>Add</button>
            </form>
            <button onClick={() => handlConfirmPres()}>Confirm</button>
            <button
              onClick={() => {
                setPresModal(false);
                setMedicines([]);
              }}
            >
              Cancel
            </button>
          </FilterModal>
        ) : null}
      </div>
    );
  }
}
export default ViewMyPatients;
