import React from "react";
import ReactDOM from "react-dom/client";
import "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PatientHome from "./Components/PatientHome/PatientHome";
import Prescriptions from "./Components/PatientHome/Prescriptions";
import Doctors from "./Components/PatientHome/Doctors";

import Packages from "./Components/Packages/Packages";
import UpdatePackage from "./Components/Packages/UpdatePackage";
import PackagesForAdmin from "./Components/Packages/PackagesForAdmin";
import CreatePackage from "./Components/Packages/CreatePackage";

import App from "./App";
import ViewFamilyMem from "./Components/Patient/ViewFamilyMem";
import NewFamilyMem from "./Components/Patient/NewFamilyMem";
import LinkAnotherPat from "./Components/Patient/LinkAnotherPat";
import MyWalletP from "./Components/Patient/MyWalletP";
import AdminBody from "./Components/Admin/Body";
import SetAdmin from "./Components/Admin/SetAdmin";
import PatientAppointments from "./Components/PatientHome/MyAppointments";
import RemovePar from "./Components/Admin/RemovePar";

import DoctorHome from "./Components/DoctorHome/DoctorHome";
import EditMyProf from "./Components/DoctorHome/EditMyProf";
import ViewMyPatients from "./Components/DoctorHome/ViewMyPatients";
import ViewDocReq from "./Components/Admin/ViewDocReq";
import AdminHome from "./Components/Admin/AdminHome";
import MyWalletD from "./Components/DoctorHome/MyWalletD";

import UploadDocuments from "./Components/PatientHome/uploadDocuments";
import DoctorRequests from "./Components/Admin/DoctorRequests";
import ResetPass from "./Components/Login_Reg/ResetPass";
import ChangePass from "./Components/Patient/ChangePass";

import DoctorAppointments from "./Components/DoctorHome/DoctorAppointments";
import ContractPage from "./Components/Login_Reg/contract";
import LoginPage from "./Components/Login_Reg/LoginPage";
import AddAppointment from "./Components/DoctorHome/AddAppointment";

import Checkout from "./Checkout/Checkout";
import Success from "./Checkout/Success";
import Cancel from "./Checkout/Cancel";

import ScheduleAppointment from "./Components/DoctorHome/ScheduleAppointment";


const root = ReactDOM.createRoot(document.getElementById("root"));

if (sessionStorage.getItem("Username") == null && sessionStorage.getItem("token") == null && sessionStorage.getItem("type") == null) {
  console.log("signin")
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginPage />} />
          <Route path="/ResetPass" element={<ResetPass />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else if(sessionStorage.getItem("type") == "Patient"){
  console.log("patient")
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/PatientAppointments"
            element={<PatientAppointments />}
          />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/PatientHome" element={<PatientHome />} />
          <Route path="/ChangePass" element={<ChangePass />} />
          <Route path="/Prescriptions" element={<Prescriptions />} />
          <Route path="/ViewFamilyMem" element={<ViewFamilyMem />} />
          <Route path="/NewFamilyMem" element={<NewFamilyMem />} />
          <Route path="/MyWalletP" element={<MyWalletP/>} />
          <Route path="/UploadDocuments" element={<UploadDocuments />} />
          <Route path="/Packages" element={<Packages />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Cancel" element={<Cancel />} />

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}else if(sessionStorage.getItem("type") == "Doctor"){
  console.log("doctor")
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/Prescriptions" element={<Prescriptions />} />
       <Route path="/DoctorHome" element={<DoctorHome />} />
       <Route path="/EditMyProf" element={<EditMyProf />} />
       <Route path="/DoctorAppointments" element={<DoctorAppointments />} />
       <Route path="/AddAppointment" element={<AddAppointment />} />
       <Route path="/ViewMyPatients" element={<ViewMyPatients />} />
       <Route path="/contract" element={<ContractPage />} />
       <Route path="/MyWalletD" element={<MyWalletD/>} />
       <Route path="/ScheduleAppointment" element={<ScheduleAppointment/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  )
}else{
  console.log("admin")
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/CreatePackage" element={<CreatePackage />} />
        <Route path="/PackagesForAdmin" element={<PackagesForAdmin />} />
        <Route path="/AdminBody" element={<AdminBody />} />
        <Route path="/setAdmin" element={<SetAdmin />} />
        <Route path="/DoctorRequests" element={<DoctorRequests />} />
        <Route path="/RemovePar" element={<RemovePar />} />
        <Route path="/ViewDocReq" element={<ViewDocReq />} />
        <Route path="/UpdatePackage" element={<UpdatePackage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  )
}