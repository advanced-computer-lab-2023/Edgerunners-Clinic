import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import axios from "axios";
import { useState, UseRef } from "react";

function ViewDocReq(props) {
  const [penDoc, setPenDoc] = useState([]);
  axios
    .get(
      "http://localhost:3005/getDoctor",
      { params: { Status: "Pending" } },
      {}
    )
    .then((res) => {
      setPenDoc(res.data);
    })
    .catch((error) => {});

  return (
    <div className="tailwind">
      <a href="/AdminHome">
        <Logo />
      </a>
      {penDoc.map((user, index) => {
        return (
          <div className=" flex justify-center" key={index}>
            <Card width="w-full" height=" h-[12rem]" className=" mb-6">
              <Logo height="4rem" />
              <body>
                Name:{user.Name} , DOB:{user.DOB} , Gender:{user.Gender}
                <br />
                phoneNumber :{user.phoneNumber} , Email:{user.Email}, Status:
                {user.Status}
                <br></br>
                Hourlyrate:{user.Hourlyrate} , Affiliation:{user.Affiliation}{" "}
                ,Education:{user.Education}
              </body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
export default ViewDocReq;
