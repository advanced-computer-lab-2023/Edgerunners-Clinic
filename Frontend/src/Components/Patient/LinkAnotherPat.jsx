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
        
     if(emailV ==="" && phoneNumV ===""){
        setWarning("Please enter the phone number or the email");
        setOk(true);
     }
     const pusername= sessionStorage.getItem("Username");
     const linkedAcc={
      patientUsername:pusername,
        email: emailV,
        phonenum: phoneNumV,
        relation: relationV,
        
     };
     await axios.post("http://localhost:3001/createLinkedAccount", linkedAcc);

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
                Adding To My Relations
              </h1>
            </div>
            <div className="flex justify-center mt-4 mb-0">
              <form onSubmit={submitHandler}>
                <div className="mt-3 ">
                  <div className=" mb-1">
                    <h4 className=" justify-center">
                        Please enter either his/her Email or  phoneNumber
                    </h4>
                    <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">
                      Email:
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      ref={Email}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className=" mb-1">
                    <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">
                      Phone Number:
                    </label>
                    <input
                      type="number"
                      id="phoneNum"
                      name="phoneNum"
                      ref={PhoneNumber}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                 
                 
                  <div className="mt-4">
                    <RelationInputSelect ref={relation} />
                  </div>
                  
                  <button
                    className="text-sky-600 outline  w-40 h-9 rounded-md mt-5 shadow ml-9"
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

export default LinkAnotherPat;
