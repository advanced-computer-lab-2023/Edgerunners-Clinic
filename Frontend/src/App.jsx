import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin"; 
import axios from "axios";


import ViewMyPatients from "./Components/DoctorHome/ViewMyPatients";





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

      <ViewMyPatients/>
    </div>
  );
}

export default App;
