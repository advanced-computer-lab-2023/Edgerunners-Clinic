import { useState,useEffect } from "react";
import axios from "axios";
function GetDoctor(){
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
      getDoctor();
      async function getDoctor() {
        const res = await axios.get("http://localhost:3005/getDoctor");
        setDoctor(res.data);
      }
    }, []);
    return doctor;
  }

export default GetDoctor;