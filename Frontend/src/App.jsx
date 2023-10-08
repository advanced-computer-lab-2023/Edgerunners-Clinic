import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";
import NewPatient from "./Components/Patient/NewPatient";
import axios from "axios";
import PatientReg from "./Components/Login_Reg/PatientReg";
import DoctorReg from "./Components/Login_Reg/DoctorReg";
import Header from "./Components/Login_Reg/Header"
import './Components/Login_Reg/App.css';


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
      <Header />
      <DoctorReg />
    </div>
  );
}

export default App;
