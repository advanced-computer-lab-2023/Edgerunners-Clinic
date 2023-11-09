import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";
import axios from "axios";

import ViewMyPatients from "./Components/DoctorHome/ViewMyPatients";

import DoctorHome from "./Components/DoctorHome/DoctorHome";
// import './index.css';
import EditMyProf from "./Components/DoctorHome/EditMyProf";
import NewFamilyMem from "./Components/Patient/NewFamilyMem";
import Doctors from "./Components/PatientHome/Doctors";
import Prescriptions from "./Components/PatientHome/Prescriptions";
import PatientReg from "./Components/Login_Reg/LoginPage";

function App() {
  const getPatients = () => {
    axios
      .get("http://localhost:3001/getPatient")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <PatientReg />
    </div>
  );
}

export default App;
