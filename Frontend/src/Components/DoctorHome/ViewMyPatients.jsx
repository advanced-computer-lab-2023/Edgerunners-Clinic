import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef,useState } from "react"; 
import axios from "axios";
import getPatient from "./getPatients";
function ViewMyPatients(props){
    let myPatients = getPatient();
    function ViewDetails(event){

    }
 

    return(
        <div className="tailwind">
          <div className=" justify-center flex mt-20">
          {myPatients.map((user) => (
            
            <div className=" flex justify-center">
              <Card width='w-4/12' height=' h-[12rem]'>
                   <Logo height='4rem'/>
                   <body>
                    Username:{user.Username}
                    <button className="  text-sky-600    w-40  h-9  rounded-md   mt-5 shadow block" onClick={ViewDetails}>View details</button>
                   </body>
              </Card>
              </div>
      ))}
          </div>
          
        </div>
    )
}
export default ViewMyPatients;