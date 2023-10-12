import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef, useState } from "react";
import GenderSelect from "../../UI/UX/GenderSelect";
import RelationInputSelect from "../../UI/UX/RelatioInputSelect";
import WarningCard from "../../UI/WarningCard";
import axios from "axios";
import createRelation  from "./GetRelation";

function NewFamilyMem() {
  const name = useRef();
  const nationalid = useRef();
  const age = useRef();
  const gender = useRef();
  const relation = useRef();
  const [ok, setOk] = useState(false);
  const [warning, setWarning] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    let nameV = name.current.value.trim();
    let nationalIdV = nationalid.current.value.trim();
    let ageV = age.current.value.trim();
    let genderV = gender.current.value;
    let relationV = relation.current.value;

    if (!nameV) {
      setWarning("Please enter your name");
      setOk(true);
    } else if (!nationalIdV) {
      setWarning("Please enter your national identity");
      setOk(true);
    } else if (!ageV || Number(ageV) <= 0) {
      setWarning("Please enter your age");
      setOk(true);
    } else if (!genderV) {
      setWarning("Please select your gender");
      setOk(true);
    } else if (!relationV) {
      setWarning("Please select your relation");
      setOk(true);
    } else {
      if (relationV === "Wife/Husband") {
        if (genderV === "Male") {
          relationV = "Husband";
        } else {
          relationV = "Wife";
        }
      }

      const newMember = {
        Name: nameV,
        NationalID: nationalIdV,
        Age: ageV,
        Relation: relationV,
        Gender: genderV,
      };
      console.log(newMember);
      setWarning("");
      setOk(false);
      newMember.Patient = sessionStorage.getItem("Username");
      await axios.post("http://localhost:3001/createRelation", newMember);
    }
  }
  function okHandeler() {
    setOk(false);
  }
  
  return (
    <div className="tailwind">
      <div className="flex justify-center mt-10">
        <Card width="w-4/12" height=" h-[32rem]">
          <div className="flex justify-center mt-10 mb-0">
          <a href="/PatientHome"><Logo height="3rem" className="mr-9" /></a>
            
            <h1 className="text-xl font-bold text-center text-sky-600 mr-8 mt-3">
              Add Family Member
            </h1>
          </div>
          <div className="flex justify-center mt-4 mb-0">
            <form onSubmit={submitHandler}>
              <div className="mt-3 ">
                <div className=" mb-1">
                  <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={name}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className=" mb-1">
                  <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">
                    NationalID:
                  </label>
                  <input
                    type="number"
                    id="nationalId"
                    name="nationalId"
                    ref={nationalid}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className=" mb-1">
                  <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    ref={age}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-1">
                  <GenderSelect ref={gender} />
                </div>
                <div className="mt-1">
                  <RelationInputSelect ref={relation} />
                </div>
                
                <button
                  className="text-sky-600 outline w-40 h-9 rounded-md mt-5 shadow ml-9"
                  type="submit"
                >
                  Confirm
    
                </button>
                
                
              </div>
            </form>
            {ok && (
              <WarningCard
                width="w-4/12"
                height=" h-[5rem]"
                onClick={okHandeler}
              >
                {warning}
              </WarningCard>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default NewFamilyMem;
