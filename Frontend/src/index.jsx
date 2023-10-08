import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PatientHome from "./Components/PatientHome/PatientHome";
import Prescriptions from "./Components/PatientHome/Prescriptions";
import PatientReg from "./Components/Login_Reg/PatientReg";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientReg />} />
        <Route path="/Prescriptions" element={<Prescriptions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
