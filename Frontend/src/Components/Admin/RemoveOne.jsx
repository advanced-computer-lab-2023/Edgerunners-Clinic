import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import axios from "axios";
import {useState ,useEffect} from "react";
import GetAdmin from "./GetAdmin";
import GetPatient from "./GetPatient";
import GetDoctor from "./GetDoctor";
function RemoveOne(props){
const Admins = GetAdmin();
const Patients = GetPatient();
const Doctors = GetDoctor();  

    return(
            <div >

            </div>  
    )
   
}
export default RemoveOne;