import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef, useState } from "react";
import GenderSelect from "../../UI/UX/GenderSelect";
import RelationInputSelect from "../../UI/UX/RelatioInputSelect";
import WarningCard from "../../UI/WarningCard";
import axios from "axios";
import createRelation from "./GetRelation";

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
      await axios.post("http://localhost:3005/createRelation", newMember);
      window.location.reload();

    }
  }
  function okHandeler() {
    setOk(false);
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <h1> Add Family Member </h1>
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                  type="text"
                  id="name"
                  name="name"
                  ref={name}
                  />
                </div>
                <div>
                  <label htmlFor="discountDoctor">
                  NationalID:
                  </label>
                  <br />
                  <input
                  type="number"
                  id="nationalId"
                  name="nationalId"
                  ref={nationalid}
                  />
                </div>
                <div>
                  <label htmlFor="discountMedicin">
                  Age:
                  </label>
                  <br />
                  <input
                  type="number"
                  id="age"
                  name="age"
                  ref={age}
                  />
                </div>
                <div className="mt-1">
                  <GenderSelect ref={gender} />
                </div>
                <div className="mt-1">
                  <RelationInputSelect ref={relation} />
                </div>
                <div>
                  <br />
                  <br />
                  <button type="submit">Confirm</button>
                </div>
              </div>
            </form>
            {ok && (
              <WarningCard
                width="w-10/12"
                height=" h-[5rem]"
                onClick={okHandeler}
              >
                {warning}
              </WarningCard>
            )}
          </div>
          {/*</Card>*/}
        </div>
      </div>
    </div>
  );
}

export default NewFamilyMem;
