import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useRef, useState } from "react";
import axios from "axios";
import WarningCard from "../../UI/WarningCard";

function SetAdmin(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const emailRef = useRef();
  const [warning, setWarning] = useState("");
  const [ok, setOk] = useState(false);

  function okHandeler() {
    setOk(false);
  }
  function confirmHandeler(event) {
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const emailValue = emailRef.current.value;

    const newAdmin = {
      Username: usernameValue,
      Password: passwordValue,
      Email: emailValue,
    };
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    let valid = false
    if (passwordRegex.test(passwordValue)) {
      valid= true; // Call the signup function here or perform other actions
    } 
    if (!usernameValue) {
      setWarning("Please enter your name");
      setOk(true);
    } else if (!passwordValue) {
      setWarning("Please enter your password");
      setOk(true);
    }else if (!valid) {
      setWarning("Please enter the password in the correct format");
      setOk(true);
    } else if (!emailValue) {
      setWarning("Please enter your Email");
      setOk(true);
    }else if (
      !passwordConRef.current.value ||
      passwordConRef.current.value !== passwordValue
    ) {
      setWarning("Confirmed Password does not match your new password");
      setOk(true);
    } else {
      axios
        .post("http://localhost:3005/addAdmin", newAdmin, {})
        .then((res) => {
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          passwordConRef.current.value = "";
          emailRef.current.value = "";
        })
        .catch((error) => {
          setOk(true);
          setWarning("username already exists");
        });
    }
  }

  function submitHandeler(event) {
    event.preventDefault();
  }

  return (
    <div >
      {/*<a href="/AdminHome">
        <Logo />
      </a>*/}
      <div >
      {/*<Card width="w-4/12" height=" h-[34rem]" >*/}
      <div >
            <Logo height="4rem" />

            <h1 >
              {" "}
              New Admin{" "}
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
                  <label >
                    {" "}
                    Email :{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={emailRef}
                  />
                </div>
                <div >
                  <label >
                    {" "}
                    Password :{" "}
                  </label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                  />
                </div>
                <div >
                  <label >
                    {" "}
                    Confirm Password :{" "}
                  </label>
                  <br />
                  <input
                    type="password"
                    id="passwordCon"
                    ref={passwordConRef}
                  />
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
export default SetAdmin;
