import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef, useState } from "react";
import axios from "axios";
import getPatient from "./getPatients";
import { GetSearchPatients } from "../PatientHome/getDoctors";

function ViewMyPatients(props) {
  const [searchPatient, setPatient] = useState();
  const [searchStatus, setStatus] = useState();
  let myPatients = GetSearchPatients({
    Username: sessionStorage.getItem("Username"),
    Name: searchPatient,
    up: searchStatus,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fuck me!");
    myPatients = await GetSearchPatients({
      Username: sessionStorage.getItem("Username"),
      Name: searchPatient,
      up: searchStatus,
    });
    console.log("Updated", myPatients);
  };
  console.log(myPatients);
  if (myPatients) {
    return (
      <div className="tailwind">
        <a href="/DoctorHome">
          <Logo />
        </a>
        <div className=" justify-center flex mt-20">
          <label htmlFor="">Patient Name:</label>
          <input
            type="text"
            onChange={(e) => {
              setPatient(e.target.value);
            }}
          />
          <label htmlFor="">See upcoming appointments: </label>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => {
              if (e.target.checked) {
                setStatus("abdo");
              } else {
                setStatus();
              }
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            submit
          </button>
          </div>
          <br/><br/>
          <div className="flex justify-center">
            {console.log("res is ", myPatients)}
            {myPatients.map((user, index) => {
              return (
                <div className="flex justify-center" key={index}>
                  <Card width="w-full" height=" h-[12rem]">
                    <a href="/DoctorHome">
                      <Logo height="4rem" />
                    </a>
                    <body>
                      Name:{user.Name}
                      DOB:{user.DOB} , Gender:
                      {user.Gender} , phoneNumber :{user.phoneNumber}
                      <br />
                      Email:{user.Email}
                    </body>
                  </Card>
                  <button>Select</button>
                </div>
              );
            })}
          </div>
        
      </div>
    );
  }
}
export default ViewMyPatients;
