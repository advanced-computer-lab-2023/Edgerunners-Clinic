import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef,useState } from "react"; 
import axios from "axios";
import getPatient from "./getPatients";
import GetPrescriptions from "../PatientHome/getPrescriptions";
function ViewMyPatients(props){
    let myPatients = getPatient();
    console.log(myPatients);
    if(myPatients){
    return(
        <div className="tailwind">
          <div className=" justify-center flex mt-20">
          {myPatients.map((user,index) => {
            return(
              <div className=" flex justify-center" key={index}>
              <Card width='w-full' height=' h-[12rem]'>
                   <Logo height='4rem'/>
                   <body>
                    Name:{user.Name} , DOB:{user.DOB} ,  Gender:{user.Gender} , phoneNumber :{user.PhoneNumber}
                    {/* <br></br>
                    EmergencyContact:{user.EmergencyContact}, phoneNumberEC:{user.phoneNumberEC} ,perscriptions:{GetPrescriptions(user)}
            */}
                   </body>
              </Card>
              </div>
            )
    })}
          </div>
          
        </div>
    )
}}
export default ViewMyPatients;