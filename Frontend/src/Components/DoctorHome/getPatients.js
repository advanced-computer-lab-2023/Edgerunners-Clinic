import { useState, useEffect } from "react";
import axios from "axios";

export default function getPatient() {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    getPatient();
    async function getPatient() {
      const x =  sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/findDoctor", {
        params: {
          Username : x
        }
      });
      setDoctor(res.data);
    }
  }, []);
  return doctor.Patients;
}

