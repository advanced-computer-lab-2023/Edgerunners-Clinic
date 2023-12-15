import { useState, useEffect } from "react";
import axios from "axios";
import { getMedicines } from "../../../../Backend/src/Routes/medicineController";

export default function getMedicines() {
  const [medicine, setMedicine] = useState([]);
  useEffect(() => {
    getMedicines();
    async function getMedicines() {
   
      const response = await axios.get("http://localhost:3001/getMedicines");
      setMedicine(response.data); 
    }
  }, []);
  return medicine;
}


  

  
