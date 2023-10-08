import { useState,useEffect } from "react";
import axios from "axios";
function GetAdmin(){
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
      getAdmin();
      async function getAdmin() {
        const res = await axios.get("http://localhost:3001/getAdmin");
        setAdmin(res.data);
      }
    }, []);
    return admin;
  }

export default GetAdmin;