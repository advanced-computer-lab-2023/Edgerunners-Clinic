import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import { useRef, useState } from "react";
function EditMyProf(props) {
  const username = sessionStorage.getItem("Username");
  const user = { username: username };
  var result = {
    Username: "",
    Password: "",
    DOB: "",
    Name: "",
    Email: "",
    Hourlyrate: 0,
    Affiliation: "",
    Education: "",
    Patients: [],
  };
  axios
    .get("http://localhost:3001/findDoctor", user, {})
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {});

  const Username = result.Username;
  const pass = result.Password;
  const dob = result.DOB;
  const name = result.Name;
  const email = result.Email;
  const hour = result.Hourlyrate;
  const aff = result.Affiliation;
  const emailRef = useRef();
  const hourRef = useRef();
  const affRef = useRef();
  const [emailTB, setEmailTB] = useState(false);
  const [hourTB, setHourTB] = useState(false);
  const [affTB, setAffTB] = useState(false);
  function editHourlyRate(event) {
    setHourTB(true);
    if (hourRef.current.value !== "" && hourTB) {
        const sentData = {
            Username: Username,
            Hourlyrate: hourRef.current.value,
          };
    
          axios
            .post("http://localhost:3001/updateAdmin", sentData, {})
            .then((res) => {
                setHourTB(false);
            })
            .catch((error) => {});
        }
    
  }
  function editAff(event) {
    setAffTB(true);
    if (affRef.current.value !== "" && affTB) {
      const sentData = {
        Username: Username,
        Affiliation: affRef.current.value,
      };

      axios
        .post("http://localhost:3001/updateAdmin", sentData, {})
        .then((res) => {
          setAffTB(false);
        })
        .catch((error) => {});
    }
  }
  function editEmail(event) {
    setEmailTB(true);
    if (emailRef.current.value !== "" && emailTB) {
      const sentData = { Username: Username, Email: emailRef.current.value };
      axios
        .post("http://localhost:3001/updateAdmin", sentData, {})
        .then((res) => {
          setEmailTB(false);
        })
        .catch((error) => {});
    }
  }

  return (
    <div className=" tailwind">
      <div className=" flex justify-center mt-8 mb-7">
        <Card width="w-4/12" height=" h-[40rem]">
          <div className=" flex justify-center  mt-6 mb-0 ">
            <Logo height="4rem" />
            <h1 className=" text-2xl font-bold  text-center   text-blue-gray-600 ml-0   mt-6 ">
              {" "}
              My Profile{" "}
            </h1>
          </div>
          <div className="  mt-1">
            <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
              Username: {Username}
            </h2>
          </div>
          <div className="  mt-1">
            <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
              Password: {pass}
            </h2>
          </div>
          <div className="  mt-1">
            <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
              DOB: {dob}
            </h2>
          </div>
          <div className="  mt-1">
            <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
              Name:{name}
            </h2>
          </div>
          <div class="flex justify-center items-center">
            <div class="mr-5  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6">
              Email:{email}
              {emailTB && (
                <input
                  type="text"
                  className="mt-4 p-2 border border-gray-400 rounded"
                  placeholder="Enter text..."
                  ref={emailRef}
                />
              )}
            </div>
            <div>
              <button
                className="  text-sky-600    w-22  h-9  rounded-md   mt-5 shadow block"
                onClick={editEmail}
              >
                Edit
              </button>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="mr-5  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6">
              Hourlyrate:{hour}{" "}
              {hourTB && (
                <input
                  type="text"
                  className="mt-4 p-2 border border-gray-400 rounded"
                  placeholder="Enter text..."
                  ref={hourRef}
                />
              )}
            </div>
            <div>
              <button
                className="  text-sky-600     w-22  h-9  rounded-md   mt-5 shadow block"
                onClick={editHourlyRate}
              >
                Edit
              </button>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="mr-5  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6">
              Affiliation: {aff}{" "}
              {affTB && (
                <input
                  type="text"
                  className="mt-4 p-2 border border-gray-400 rounded"
                  placeholder="Enter text..."
                  ref={affRef}
                />
              )}
            </div>
            <div>
              <button
                className="  text-sky-600     w-22  h-9  rounded-md   mt-5 shadow block"
                onClick={editAff}
              >
                Edit
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default EditMyProf;
