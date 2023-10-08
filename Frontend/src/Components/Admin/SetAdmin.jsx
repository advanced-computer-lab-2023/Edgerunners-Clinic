import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useRef } from "react";
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core";

function SetAdmin(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  function submitHandeler(event) {
    event.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const passwordConValue = passwordConRef.current.value;
    const newAdmin = {
      userName: usernameValue,
      Password: passwordValue,
      PasswordConfirm: passwordConValue,
    };
    console.log(newAdmin);
  }
  return (
    <div className=" hazem-justify-center hazem-flex hazem-mt-20">
      <Card width="w-4/12" height=" h-[32rem]">
        <div className=" hazem-flex hazem-justify-center  hazem-mt-6 hazem-mb-0 ">
          <Logo height="4rem" />

          <h1 className=" hazem-text-2xl hazem-font-bold  hazem-text-center  hazem-text-sky-600  hazem-ml-0   hazem-mt-6 ">
            {" "}
            New Admin{" "}
          </h1>
        </div>
        <div className=" hazem-flex hazem-justify-center hazem-mt-7">
          <form onSubmit={submitHandeler}>
            <div className=" hazem-mt-3">
              <div className=" hazem-mb-4">
                <label className=" hazem-text-xl hazem-font-bold   hazem-font-SourceSansPro  hazem-text-gray-500 hazem-ml-2">
                  {" "}
                  Username :{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  ref={usernameRef}
                  className="hazem-w-full hazem-px-4 hazem-py-2 hazem-border hazem-rounded-md hazem-focus:outline-none hazem-focus:border-blue-500"
                />
              </div>

              <div className=" hazem-mb-4">
                <label className=" hazem-text-xl hazem-font-bold   hazem-font-SourceSansPro  hazem-text-gray-500  hazem-ml-2">
                  {" "}
                  Password :{" "}
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  className="hazem-w-full hazem-px-4 hazem-py-2 hazem-border hazem-rounded-md hazem-focus:outline-none hazem-focus:border-blue-500"
                />
              </div>
              <div className=" hazem-mb-4">
                <label className=" hazem-text-xl hazem-font-bold    hazem-font-SourceSansPro   hazem-text-gray-500 hazem-ml-2">
                  {" "}
                  Confirm Password :{" "}
                </label>
                <br />
                <input
                  type="password"
                  id="passwordCon"
                  ref={passwordConRef}
                  className="hazem-w-full hazem-px-4 hazem-py-2 hazem-border hazem-rounded-md hazem-focus:outline-none hazem-focus:border-blue-500"
                />
              </div>
              <div className=" hazem-flex hazem-justify-center  hazem-mt-6">
                <br />
                <br />
                <button className="  hazem-text-sky-600  hazem-outline  hazem-w-40  hazem-h-9  hazem-rounded-md   hazem-mt-5 hazem-shadow">
                  {" "}
                  Confirm{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
export default SetAdmin;
