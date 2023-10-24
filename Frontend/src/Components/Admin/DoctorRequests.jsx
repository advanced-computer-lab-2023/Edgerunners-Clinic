import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../UI/UX/Logo";

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
      });
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }

  return data;
};

const styles = {
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
        Status: "Accepted",
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

  return (
    <div  >
      <div >
        <a href="/AdminHome">
          <Logo />
        </a>
      </div>
      <div style={styles.tableContainer}>
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
              <tr
                key={request.id}
                style={index % 2 === 0 ? styles.evenRow : {}}
              >
                <td style={styles.tableCell}>{request.id}</td>
                <td style={styles.tableCell}>{request.username}</td>
                <td style={styles.tableCell}>{request.fullName}</td>
                <td style={styles.tableCell}>{request.email}</td>
                <td style={styles.tableCell}>{request.dateOfBirth}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorRequests;
