import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";
import NewPatient from "./Components/Patient/NewPatient";
import axios from "axios";
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
    <NewPatient/>
  );
}

export default App;
