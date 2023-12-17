import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef, useState } from "react";
import RelationInputSelect from "../../UI/UX/RelatioInputSelect";
import WarningCard from "../../UI/WarningCard";
import axios from "axios";

function LinkAnotherPat() {
  const Email = useRef();
  const PhoneNumber = useRef();

  const relation = useRef();
  const [ok, setOk] = useState(false);
  const [warning, setWarning] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    const emailV = Email.current.value;
    let phoneNumV = PhoneNumber.current.value;
    let relationV = relation.current.value;
    console.log(emailV);
    console.log(phoneNumV);

    if (emailV === "" && phoneNumV === "") {
      setWarning("*Please enter the phone number or the email*");
      setOk(true);
    }
    const pusername = sessionStorage.getItem("Username");
    const linkedAcc = {
      patientUsername: pusername,
      email: emailV,
      phonenum: phoneNumV,
      relation: relationV,
    };
    await axios.post("http://localhost:3005/createLinkedAccount", linkedAcc);
  }

  return (
    <div className="Bootstrap PatientHome">
      <div className="">
        <div className="link-patient-header">
          <h3 className="">Adding A Relative</h3>
        </div>
        <div className="">
          <form onSubmit={submitHandler}>
            <div className="link-patient-container">
              <div className="link-patient-item">
                <label className="">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Do You Know their E-mail..?"
                  ref={Email}
                  className=""
                />
              </div>
              <div className="link-patient-item">
                <label className="">Phone Number</label>
                <input
                  type="number"
                  placeholder="You Can Use Phone Number Instead.."
                  id="phoneNum"
                  name="phoneNum"
                  ref={PhoneNumber}
                  className=""
                />
              </div>
              <div className="link-patient-item">
                <RelationInputSelect ref={relation} />
              </div>
            </div>
            {ok ? <div style={{color:'red'}}>{warning}</div> : null}
            <button className="" type="submit">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LinkAnotherPat;
