import { useState, useEffect } from "react";
import axios from "axios";

export default function GetPackages() {
  const [Packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages();
    async function getPackages() {
      const res = await axios.get("http://localhost:3001/getPackage");
      setPackages(res.data);
    }
  }, []);
  return Packages;
}

export function AddPackages(p) {
  useEffect(() => {
    AddPackages();
    async function AddPackages() {
      await axios.post("http://localhost:3001/createPackage", p);
    }
  }, []);
}

export function UpdatePackages(p) {
  useEffect(() => {
    UpdatePackages();
    async function UpdatePackages() {
      await axios.put("http://localhost:3001/UpdatePackage", p);
    }
  }, []);
}
