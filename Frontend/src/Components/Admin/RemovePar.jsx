import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useState, useRef } from "react";
import WarningCard from "../../UI/WarningCard";
import Roles from "../../UI/UX/Roles";
import axios from "axios";
function RemovePar(props) {
  const role = useRef();
  const usernameRef = useRef();
  const [warning, setWarning] = useState("");
  const [ok, setOk] = useState(false);
  function submitHandeler(event) {
    event.preventDefault();
  }
  function confirmHandeler(event) {
    const username = { Username: usernameRef.current.value };
    let roleValue = role.current.value;
    console.log(roleValue);
    if (usernameRef.current.value === "") {
      setOk(true);
      setWarning("please enter a username");
    } else if (roleValue === "") {
      setOk(true);
      setWarning("please select a Role");
    } else {
      if (roleValue === "Admin") {
        console.log(username);
        axios
          .delete("http://localhost:3001/deleteAdmin",{data:username})
          .then((res) => {
            usernameRef.current.value = "";
          })
          .catch((error) => {
            setWarning("this username is invalid");
            setOk(true);
          });
      } else if (roleValue === "Doctor") {
        axios
          .delete("http://localhost:3001/deleteDoctor", {data:username})
          .then((res) => {
            usernameRef.current.value = "";
            roleValue = "";
          })
          .catch((error) => {
            setWarning("this username is invalid");
            setOk(true);
          });
      } else {
        axios
          .delete("http://localhost:3001/deletePatient", {data:username})
          .then((res) => {
            usernameRef.current.value = "";
            roleValue = "";
          })
          .catch((error) => {
            setWarning("this username is invalid");
            setOk(true);
          });
      }
    }
  }
  function okHandeler(event) {
    setOk(false);
  }

  return (
    <div className="tailwind">
      <a href="/AdminHome">
        <Logo />
      </a>
      <div className=" justify-center flex mt-20">
        <Card width="w-4/12" height=" h-[32rem]">
          <div className=" flex justify-center  mt-6 mb-0 ">
            <Logo height="4rem" />

            <h1 className=" text-2xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
              {" "}
              Remove Participant{" "}
            </h1>
          </div>
          <div className=" flex justify-center mt-7">
            <form onSubmit={submitHandeler}>
              <div className=" mt-3">
                <div className=" mb-4">
                  <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                    {" "}
                    Username :{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={usernameRef}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className=" mb-4">
                  <Roles ref={role} />
                </div>

                <div className=" flex justify-center  mt-6">
                  <br />
                  <br />
                  <button
                    className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow block"
                    type="submit"
                    onClick={confirmHandeler}
                  >
                    {" "}
                    Confirm{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card>
        {ok && (
          <WarningCard width="w-4/12" height=" h-[5rem]" onClick={okHandeler}>
            {warning}
          </WarningCard>
        )}
      </div>
    </div>
  );
}
export default RemovePar;
