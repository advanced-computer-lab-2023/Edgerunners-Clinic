import React, { useState } from "react";
import Logo from "../../UI/UX/Logo";
import GetDoctors, { GetSpecialities } from "./getDoctors";
import GetAppointments from "./getAppoinments";
import axios from "axios";
import GetRelation from "./getRelation";
import PayButton from "../Packages/PayButton";

export default function Doctors() {
  const [speciality, setSpeciality] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [chosen , setChosen] = useState();
  let Specialities = GetSpecialities();
  let Relation = GetRelation({
    Username: sessionStorage.getItem("Username")
  })

  let Doc = GetDoctors({
    Speciality: speciality,
    Name: name,
  });
  let appointmentDate = GetAppointments({
    Date: date,
    Speciality: speciality,
    Name: name,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Doc = await GetDoctors({
      Speciality: speciality,
      Name: name,
    });
    appointmentDate = await GetAppointments({
      Date: date,
      Speciality: speciality,
      Name: name,
    });
  };

  const handleSubmit2 = async (e, doctor, Date, TimeH, TimeM) => {
    e.preventDefault();
    let NationalID = "";
    if(chosen !== sessionStorage.getItem("Username")){
      NationalID = chosen;
    }
    await axios.put(`http://localhost:3001/updateAppointment`, {
      DoctorUsername: doctor,
      Date: Date,
      TimeH: TimeH,
      TimeM: TimeM,
      Availability: "Reserved",
      PatientUsername: sessionStorage.getItem("Username"),
      NationalID: NationalID
    });
  };
  
  const handleCheckout = async(name) => {
    console.log(name);
    await axios.post("http://localhost:3001/create-checkout-session",{
       name
   })
   .then((res)=>{
       window.location = res.data.url
   }).catch((err) => console.log(err.message));
}
  console.log(appointmentDate);

  if (Doc || appointmentDate) {
    console.log(appointmentDate);
    return (
      <div className="Bootstrap PatientHome">
        <div className="header">
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
            <div className="container">
              <a href="/PatientHome">
                <Logo />
              </a>
              <button
                className="navbar-toggler ps-0"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarExample01"
                aria-controls="navbarExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                  <i className="fas fa-bars"></i>
                </span>
              </button>
              <div className="navbar-collapse" id="navbarExample01">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#pets">
                      Video Call
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#adoptions"
                    >
                      Chat
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#foundation"
                    >
                      My Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#help">
                      Health Record
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#education"
                    >
                      Doctors
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#about">
                      My Account
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#contact">
                      Log Out
                    </a>
                  </li>
                </ul>

                <ul className="navbar-nav flex-row">
                  <li className="nav-item">
                    <a className="nav-link px-2" href="#!">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-2" href="#!">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link ps-2" href="#!">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="form-prescription">
          <label htmlFor="">Speciality</label>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setSpeciality(e.target.value);
            }}
          />
          <select onChange={(e) => {
            setSpeciality(e.target.value);
          }}>
            <option value="">Select Speciality</option>
            {Specialities.map((speciality) =>{
              return <option value={speciality}>{speciality}</option>
            })}
          </select>
          <label htmlFor="">doctor</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="">Date</label>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button type="submit" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
        <div>
          {/* {Doc.map((d, index) => {
            return (
              <div key={index}>
                <a>{d.Name}</a>
                <br />
                <a>{d.Hourlyrate + " EGP"}</a>
                <br />
                <a>{d.Affiliation}</a>
                <br />
                <a>{d.Education}</a>
                <br />
                <button>select</button>
              </div>
            );
          })} */}
          {appointmentDate.map((a, index) => {
            return (
              <div key={index}>
                <p>Name: {a.Doctor.Name}</p>
                <p>Speciality: {a.Doctor.Speciality}</p>
                <p>Session Price/hour: {a.Doctor.Hourlyrate}</p>
                <p>Hospital: {a.Doctor.Affiliation}</p>
                <p>Education: {a.Doctor.Education}</p>
                <p>Date: {a.Date}</p>
                <p>Hour: {a.TimeH}</p>
                <p>Minute: {a.TimeM}</p>
                
                <select onChange={(e) => setChosen(e.target.value)}>
                  <option value={sessionStorage.getItem("Username")}>myself</option>
                  {Relation.data.map((item)=>{
                    return <option value={item.NationalID}>{item.Name}</option>
                  })
                  }
                </select>
                {/* {<PayButton name = {a.Doctor.Name} /> } */}
                <button
                  onClick={(e) =>{
                    handleSubmit2(
                      e,
                      a.Doctor.Username,
                      a.Date,
                      a.TimeH,
                      a.TimeM
                    ),
                     handleCheckout(a.Doctor.Name)}
                  }
                >
                  reserve
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
