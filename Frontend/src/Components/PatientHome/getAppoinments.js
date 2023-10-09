import { useState, useEffect } from "react";
import axios from "axios";

export default function GetAppointments({Date}) {
    const [Appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      getAppointments();
      async function getAppointments() {
        const res = await axios.get(`http://localhost:3001/getAppointment`, {
          params: {
            Date,
          },
        });
        setAppointments(res.data);
      }
    }, [Date]); // Include the filter parameters in the dependency array
  
    return Appointments;
  }

  export function UpdateAppointments(PatientUsername , DoctorUsername) {
  
    useEffect(() => {
      getAppointments();
      async function getAppointments() {
        const res = await axios.put(`http://localhost:3001/updateAppointment`, {
          PatientUsername: PatientUsername, DoctorUsername:DoctorUsername
        });
      }
    }, []); // Include the filter parameters in the dependency array
  
    return "done";
  }
