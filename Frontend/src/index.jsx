import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SetAdmin from "./Components/Admin/SetAdmin";
import PatientHome from "./PatientHome";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PatientHome />
  </React.StrictMode>
);
