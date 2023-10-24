import { useState, useEffect } from "react";
import axios from "axios";

export function FilterAppointmentsDate({ Date, DoctorUsername }) {
    const [Appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      getMyAppointments();
      async function getMyAppointments() {
        const res = await axios.get(`http://localhost:3001/filterDateAppointments`, {
          params: {
            Date, DoctorUsername
          },
        });
        setAppointments(res.data);
      }
    }, [Date, DoctorUsername]);
  
    return Appointments;
  }
  
  export function FilterAppointmentsStatus({ Status, DoctorUsername }) {
    const [Appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      getMyAppointmentsD();
      async function getMyAppointmentsD() {
        const res = await axios.get(`http://localhost:3001/filterStatusAppointments`, {
          params: {
            Status, DoctorUsername
          },
        });
        setAppointments(res.data);
      }
    }, [Status, DoctorUsername]);
  
    return Appointments;
  }