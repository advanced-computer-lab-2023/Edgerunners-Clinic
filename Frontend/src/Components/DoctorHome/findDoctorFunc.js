import { useState, useEffect } from "react";
import axios from "axios";

export default function getDoctor() {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    getDoctor();
    async function getDoctor() {
      const x =  sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/findDoctor", {
        params: {
          Username : x
        }
      });
      setDoctor(res.data);
    }
  }, []);
  return doctor;
}