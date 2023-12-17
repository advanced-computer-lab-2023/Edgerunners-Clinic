import { useState, useEffect } from "react";
import axios from "axios";

export default function GetRelation() {
  const [relation, setRelation] = useState([]);
  useEffect(() => {
    getRelation();
    async function getRelation() {
      const x =  sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3005/getRelation", {
        params: {
          Username : x
        }
      });
      setRelation(res.data);
    }
  }, []);
  return relation;
}

