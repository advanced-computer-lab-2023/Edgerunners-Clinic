import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../UI/UX/Logo";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../Patient/Footer";

const makeRequestTable = async () => {
  const data = [];
  try {
    const response = await axios.get("http://localhost:3001/getDoctor");
    const doctors = response.data.filter(
      (doctor) => doctor.Status === "Pending"
    );

    for (let i = 0; i < doctors.length; i++) {
      const p = doctors[i];
      const id = i;
      const username = p.Username;
      const fullName = p.Name;
      const email = p.Email;
      const dateOfBirth = p.DOB;
      const hourlyRate = p.Hourlyrate;
      const affiliation = p.Affiliation;
      const educationalBackground = p.Education;
      const speciality = p.Speciality;
      const status = p.Status;
      const files = p.FileNames;
      data.push({
        id,
        username,
        fullName,
        email,
        dateOfBirth,
        hourlyRate,
        affiliation,
        educationalBackground,
        speciality,
        status,
        files,
      });
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }

  return data;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
  },
  tableContainer: {
    margin: "20px",
  },
  requestTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  acceptButton: {
    backgroundColor: "#198D19",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "5px",
  },
  rejectButton: {
    backgroundColor: "#D50000",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "5px",
  },
};

const DoctorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await makeRequestTable();
        setRequests(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleAccept = async (username) => {
    try {
      await axios.put("http://localhost:3001/updateDoctor", {
        Username: username,
        Status: "Waiting",
      });

      const updatedRequests = requests.map((request) =>
        request.username === username ? {} : request
      );

      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating data:", error);
      console.error("MongoDB Error:", error.response.data);
    }
  };

  const handleReject = async (username) => {
    try {
      await axios.put("http://localhost:3001/updateDoctor", {
        Username: username,
        Status: "Rejected",
      });

      const updatedRequests = requests.map((request) =>
        request.username === username ? {} : request
      );

      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );
  const handleToggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const handleViewFiles = async (filename) => {
    await axios
      .get(`http://localhost:3001/viewFilesDoctor/${filename}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <div className="Bootstrap PatientHome" style={styles.container}>
      <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
        <div className="container">
          <Link to="/adminHome" className="logo-link">
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
                <a className="nav-link" aria-current="page" href="/setAdmin">
                  Add Admin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/removePar">
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
                  href="/createPackage"
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
      <br />
      <br />
      <br />
      <br />
      <div style={{ ...styles.mainContent, ...styles.tableContainer }}>
        <table style={styles.requestTable}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>ID</th>
              <th style={styles.tableCell}>Username</th>
              <th style={styles.tableCell}>Name</th>
              <th style={styles.tableCell}>Email</th>
              <th style={styles.tableCell}>Date of Birth</th>
              <th style={styles.tableCell}>Hourly Rate</th>
              <th style={styles.tableCell}>Affiliation</th>
              <th style={styles.tableCell}>Educational Background</th>
              <th style={styles.tableCell}>Speciality</th>
              <th style={styles.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request, index) => (
              <React.Fragment key={request.id}>
                <tr style={index % 2 === 0 ? styles.evenRow : {}}>
                  <td style={styles.tableCell}>{request.id}</td>
                  <td style={styles.tableCell}>{request.username}</td>
                  <td style={styles.tableCell}>{request.fullName}</td>
                  <td style={styles.tableCell}>{request.email}</td>
                  <td style={styles.tableCell}>
                    {request.dateOfBirth.toString().split("T")[0]}
                  </td>
                  <td style={styles.tableCell}>{request.hourlyRate}</td>
                  <td style={styles.tableCell}>{request.affiliation}</td>
                  <td style={styles.tableCell}>
                    {request.educationalBackground}
                  </td>
                  <td style={styles.tableCell}>{request.speciality}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.acceptButton}
                      onClick={() => handleAccept(request.username)}
                    >
                      Accept
                    </button>
                    <button
                      style={styles.rejectButton}
                      onClick={() => handleReject(request.username)}
                    >
                      Reject
                    </button>
                  </td>
                  <td style={styles.tableCell}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggleExpand(index)}
                    >
                      {expandedRow === index ? "▲" : "▼"}
                    </span>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan="10">
                      <div
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: "2px",
                          border: "1px solid #ddd",
                          width: "100%",
                        }}
                      >
                        {request.files.map((fileName, index) => (
                          <div
                            key={index}
                            style={{
                              fontSize: "20px",
                              marginTop: "5px",
                              marginBottom: "5px",
                              padding: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            className="hr-file-upload-item"
                          >
                            <span style={{ marginRight: "10px" }}>
                              {fileName}
                            </span>
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="faDownload"
                              onClick={() => handleViewFiles(fileName)}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DoctorRequests;
