import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PatientHome from "./Components/PatientHome/PatientHome";
import Prescriptions from "./Components/PatientHome/Prescriptions";

import PatientReg from "./Components/Login_Reg/PatientReg";
import Packages from "./Components/Packages/Packages";
import UpdatePackage from "./Components/Packages/UpdatePackage";
import App from "./App";
import ViewFamilyMem from "./Components/Patient/ViewFamilyMem";
import NewFamilyMem from "./Components/Patient/NewFamilyMem";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Prescriptions" element={<Prescriptions />} />
        <Route path="/ViewFamilyMem" element={<ViewFamilyMem />} />
        <Route path="/NewFamilyMem" element={<NewFamilyMem />} />
        <Route path="/UpdatePackage" element={<UpdatePackage />} />
        <Route path="/Packages" element={<Packages />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
