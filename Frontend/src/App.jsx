import Logo from "./UI/UX/Logo";
import SetAdmin from "./Components/Admin/SetAdmin";
import NewPatient from "./Components/Patient/NewPatient";
import axios from "axios";
import Body from "./Components/LoginPatient/Body";
import Header from "./Components/LoginPatient/Header"
import './Components/LoginPatient/App.css';

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
      <Body />
    </div>
  );
}

export default App;
