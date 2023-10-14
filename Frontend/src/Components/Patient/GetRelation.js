import { useState, useEffect } from "react";
import axios from "axios";

export default function getRelation() {
  const [Relation, setRelation] = useState([]);
  useEffect(() => {
    getRelation();
    async function getRelation() {
      const x =  sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getRelation", {
        params: {
          Username : x
        }
      });
      setRelation(res.data);
    }
  }, []);
  return Relation;
}

export function createRelation(p) {
  useEffect(() => {
    
    createRelation();
    async function createRelation() {
      p.Patient = sessionStorage.getItem("Username");
      await axios.post("http://localhost:3001/createRelation", p);
    }
  }, []);
}
