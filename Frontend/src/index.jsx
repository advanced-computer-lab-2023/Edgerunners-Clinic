import React from "react";
import ReactDOM from "react-dom/client";
import Packages from "./Components/Admin/Packages";
import CreatePackage from "./Components/Admin/CreatePackage";
import PatientHome from "./PatientHome";
import "./index.css";
<<<<<<< Updated upstream
import NewPatient from "./Components/Patient/NewPatient";
import App from "./App";
=======
import SetAdmin from "./Components/Admin/SetAdmin";
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    
    <NewPatient />
=======
    <SetAdmin />
>>>>>>> Stashed changes
  </React.StrictMode>
);
