import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef, useState } from "react";
import axios from "axios";
import getPatient from "./getPatients";
import GetPrescriptions from "../PatientHome/getPrescriptions";
function ViewMyPatients(props) {
  let myPatients = getPatient();
  console.log(myPatients);
  if (myPatients) {
    return (
      <div className="tailwind">
        <div className=" justify-center flex mt-20">
          {myPatients.map((user, index) => {
            return (
              <div className=" flex justify-center" key={index}>
                <Card width="w-full" height=" h-[12rem]">
                  
                <a href="/DoctorHome"><Logo height="4rem" /></a>
                  <body>
                    Name:{user.patient.Name} , DOB:{user.patient.DOB} , Gender:
                    {user.patient.Gender} , phoneNumber :
                    {user.patient.phoneNumber}
                    <br />
                    Email:{user.patient.Email}
                    <br />
                    Prescriptions:
                    <br />
                    Status:{user.prescriptions.Status},Date:
                    {user.prescriptions.Date}
                  </body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ViewMyPatients;
