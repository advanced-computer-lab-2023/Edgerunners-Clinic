import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";

import axios from "axios";

import PatientReg from "./Components/Login_Reg/PatientReg";
import PatientHome from './Components/PatientHome/PatientHome';

import Packages from "./Components/Packages/Packages";
//import RemovePar from "./Components/Admin/RemovePar";

import DoctorHome from "./Components/DoctorHome/DoctorHome";
// import './index.css';
import EditMyProf from "./Components/DoctorHome/EditMyProf";




function App() {
  const getPatients = () => {
    axios.get('http://localhost:3001/getPatient')
    .then(res => {
      console.log(res)
    }).catch(err =>{
      console.log(err)
    })
  }
  return (
    <div className="App">
      <PatientReg/>
    </div>
  );
}

export default App;
