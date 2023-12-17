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
          .delete("http://localhost:3005/deleteAdmin",{data:username})
          .then((res) => {
            usernameRef.current.value = "";
          })
          .catch((error) => {
            setWarning("this username is invalid");
            setOk(true);
          });
      } else if (roleValue === "Doctor") {
        axios
          .delete("http://localhost:3005/deleteDoctor", {data:username})
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
          .delete("http://localhost:3005/deletePatient", {data:username})
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
    <div >
      {/*<a href="/AdminHome">
        <Logo />
      </a>*/}
      <div >
      {/*<Card width="w-4/12" height=" h-[32rem]">*/}
          <div >
            <Logo height="4rem" />

            <h1 >
              {" "}
              Remove Participant{" "}
            </h1>
          </div>
          <div >
            <form onSubmit={submitHandeler}>
              <div >
                <div >
                  <label >
                    {" "}
                    Username :{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={usernameRef}
                  />
                </div>
                <div >
                  <Roles ref={role} />
                </div>

                <div >
                  <br />
                  <br />
                  <button
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
      {/*</Card>*/}
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
