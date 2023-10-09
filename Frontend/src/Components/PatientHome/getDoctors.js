import { useState, useEffect } from "react";
import axios from "axios";

export default function GetDoctors({ Education, Name}) {
    const [Doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      getDoctors();
      async function getDoctors() {
        const res = await axios.get(`http://localhost:3001/getDoctor`, {
          params: {
            Education,
            Name,
          },
        });
        console.log("res: " + res)
        setDoctors(res.data);
      }
    }, [Education , Name]); // Include the filter parameters in the dependency array
  
    return Doctors;
  }
