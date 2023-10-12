import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useRef, useState } from "react";
import axios from "axios";
import WarningCard from "../../UI/WarningCard";

function SetAdmin(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const [warning, setWarning] = useState("");
  const [ok, setOk] = useState(false);

  function okHandeler() {
    setOk(false);
  }

  function confirmHandeler(event) {
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;

    const newAdmin = {
      Username: usernameValue,
      Password: passwordValue,
    };

    if (!usernameValue) {
      setWarning("Please enter your name");
      setOk(true);
    } else if (!passwordValue) {
      setWarning("Please enter your password");
      setOk(true);
    } else if (
      !passwordConRef.current.value ||
      passwordConRef.current.value !== passwordValue
    ) {
      setWarning("Confirmed Password does not match your new password");
      setOk(true);
    } else {
      axios
        .post("http://localhost:3001/addAdmin", newAdmin, {})
        .then((res) => {
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          passwordConRef.current.value = "";
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
              New Admin{" "}
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
                  <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                    {" "}
                    Password :{" "}
                  </label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className=" mb-4">
                  <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2">
                    {" "}
                    Confirm Password :{" "}
                  </label>
                  <br />
                  <input
                    type="password"
                    id="passwordCon"
                    ref={passwordConRef}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className=" flex justify-center  mt-6">
                  <br />
                  <br />
                  <button
                    className="  text-sky-600    w-40  h-9  rounded-md   mt-5 shadow block"
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
export default SetAdmin;
