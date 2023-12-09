import { useState, useEffect } from "react";
import axios from "axios";

export default function GetAppointments({ Date, Name, Speciality}) {
  const [Appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
    async function getAppointments() {
      const res = await axios.get(`http://localhost:3001/getAppointment`, {
        params: {
          Date,
          Name,
          Speciality,
        },
      });
      setAppointments(res.data);
    }
  }, [Date, Name, Speciality]); // Include the filter parameters in the dependency array

  return Appointments;
}

export function GetAppointmentsFilter({DoctorUsername}){
  const [appointmentsFilter, setAppointmentsFilter] = useState([]);
  useEffect(() =>{
    getAppointmentsFilter();
    async function getAppointmentsFilter(){
      const res = await axios.get(`http://localhost:3001/getAppointmentFilter`, {
        params:{
          DoctorUsername
        }
      });
      setAppointmentsFilter(res.data);
    }
  }, [DoctorUsername]);
  return appointmentsFilter;
}

export function UpdateAppointments({
  PatientUsername,
  DoctorUsername,
  Date,
  TimeH,
  TimeM,
}) {
  useEffect(() => {
    getAppointments();
    async function getAppointments() {
      const res = await axios.put(`http://localhost:3001/updateAppointment`, {
        params: {
          PatientUsername,
          DoctorUsername,
          Date,
          TimeH,
          TimeM,
        },
      });
    }
  }, [PatientUsername, DoctorUsername]); // Include the filter parameters in the dependency array

  return "done";
}

export function FilterAppointmentsDate({ Date, PatientUsername }) {
  const [Appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments();
    async function getMyAppointments() {
      const res = await axios.get(
        `http://localhost:3001/filterDateAppointments`,
        {
          params: {
            Date,
            PatientUsername,
          },
        }
      );
      setAppointments(res.data);
    }
  }, [Date, PatientUsername]);

  return Appointments;
}

export function FilterAppointmentsStatus({ Status, PatientUsername }) {
  const [Appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointmentsD();
    async function getMyAppointmentsD() {
      //console.log(PatientUsername)
      const res = await axios.get(
        `http://localhost:3001/filterStatusAppointments`,
        {
          params: {
            Status,
            PatientUsername,
          },
        }
      );
      setAppointments(res.data);
      //console.log(res.data)
    }
  }, [Status, PatientUsername]);

  return Appointments;
}
