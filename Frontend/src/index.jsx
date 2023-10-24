import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PatientHome from "./Components/PatientHome/PatientHome";
import Prescriptions from "./Components/PatientHome/Prescriptions";
import Doctors from "./Components/PatientHome/Doctors";

import DoctorReg from "./Components/Login_Reg/DoctorReg";
import PatientReg from "./Components/Login_Reg/PatientReg";

import Packages from "./Components/Packages/Packages";
import UpdatePackage from "./Components/Packages/UpdatePackage";
import PackagesForAdmin from "./Components/Packages/PackagesForAdmin";
import CreatePackage from "./Components/Packages/CreatePackage";

import App from "./App";
import ViewFamilyMem from "./Components/Patient/ViewFamilyMem";
import NewFamilyMem from "./Components/Patient/NewFamilyMem";

import AdminBody from "./Components/Admin/Body";
import SetAdmin from "./Components/Admin/SetAdmin";
import PatientAppointments from "./Components/PatientHome/MyAppointments";
import RemovePar from "./Components/Admin/RemovePar";

import DoctorHome from "./Components/DoctorHome/DoctorHome";
import EditMyProf from "./Components/DoctorHome/EditMyProf";
import ViewMyPatients from "./Components/DoctorHome/ViewMyPatients";
import ViewDocReq from "./Components/Admin/ViewDocReq";
import AdminHome from "./Components/Admin/AdminHome";
import ChangePass from "./Components/Patient/ChangePass";

import DoctorAppointments from "./Components/DoctorHome/DoctorAppointments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/PatientAppointments" element={<PatientAppointments />} />
        <Route path="/DoctorAppointments" element={<DoctorAppointments />} />

        <Route path="/" element={<PatientReg />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/PatientHome" element={<PatientHome />} />
        <Route path="/PatientReg" element={<PatientReg />} />
        <Route path="/ChangePass" element={<ChangePass />} />

        <Route path="/Prescriptions" element={<Prescriptions />} />
        <Route path="/ViewFamilyMem" element={<ViewFamilyMem />} />
        <Route path="/NewFamilyMem" element={<NewFamilyMem />} />
        <Route path="/UpdatePackage" element={<UpdatePackage />} />
        <Route path="/Packages" element={<Packages />} />

        <Route path="/CreatePackage" element={<CreatePackage />} />
        <Route path="/PackagesForAdmin" element={<PackagesForAdmin />} />
        <Route path="/AdminBody" element={<AdminBody />} />
        <Route path="/setAdmin" element={<SetAdmin />} />
        <Route path="/RemovePar" element={<RemovePar />} />
        <Route path="/DoctorHome" element={<DoctorHome />} />
        <Route path="/EditMyProf" element={<EditMyProf />} />
        <Route path="/ViewMyPatients" element={<ViewMyPatients />} />
        <Route path="/DoctorReg" element={<DoctorReg />} />
        <Route path="/ViewDocReq" element={<ViewDocReq />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
