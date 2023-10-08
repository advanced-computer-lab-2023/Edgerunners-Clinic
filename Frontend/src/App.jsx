import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";

import axios from "axios";

import DoctorReg from "./Components/Login_Reg/DoctorReg";
import Header from "./Components/Login_Reg/Header"
import PatientReg from "./Components/Login_Reg/PatientReg";
import PatientHome from './PatientHome';



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
      <PatientReg />
    </div>
  );
}

export default App;
