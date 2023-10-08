import { useState,useEffect } from "react";
import axios from "axios";
function GetPatient(){
    const [patient, setPatient] = useState([]);

    useEffect(() => {
      getPatient();
      async function getPatient() {
        const res = await axios.get("http://localhost:3001/getPatient");
        setPatient(res.data);
      }
    }, []);
    return patient;
  }

export default GetPatient;