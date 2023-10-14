import { useState, useEffect } from "react";
import axios from "axios";

export default function GetDoctors({ Speciality, Name}) {
    const [Doctors, setDoctors] = useState([]);  
    useEffect(() => {
      getDoctors();
      async function getDoctors() {
        const res = await axios.get(`http://localhost:3001/getDoctor`, {
          params: {
            Speciality,
            Name,
          },
        });
        console.log("res: " + res)
        setDoctors(res.data);
      }
    }, [Speciality , Name]); // Include the filter parameters in the dependency array
  
    return Doctors;
  }

 export function GetSearchPatients({Username,Name,up }) {
    const [patient, setPatients] = useState([]);
  
    useEffect(() => {
      getPatients();
      async function getPatients() {
        const res = await axios.get(`http://localhost:3001/filterPatient`, {
          params: {
            Username,
            Name,
            up
          },
        });
        setPatients(res.data);
      }
    }, [Username, Name, up]); // Include the filter parameters in the dependency array
  
    return patient;
  }
  