import { useState, useEffect } from "react";
import axios from "axios";

export default function GetPrescriptions({Patient, Date, Doctor, Status }) {
    const [Prescriptions, setPrescriptions] = useState([]);
  
    useEffect(() => {
      getPrescriptions();
      async function getPrescriptions() {
        const res = await axios.get(`http://localhost:3005/getPrescriptions`, {
          params: {
            Patient,
            Date,
            Doctor,
            Status,
          },
        });
        setPrescriptions(res.data);
      }
    }, [Date, Doctor, Status]); // Include the filter parameters in the dependency array
  
    return Prescriptions;
  }
