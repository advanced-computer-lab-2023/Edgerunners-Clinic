import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NewPatient from "./Components/Patient/NewPatient";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <NewPatient />
  </React.StrictMode>
);
