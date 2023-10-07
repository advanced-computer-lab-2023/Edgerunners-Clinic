import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import { useRef,useState } from "react";
import GenderSelect from "../../UI/UX/GenderSelect";
import RelationInputSelect from "../../UI/UX/RelatioInputSelect";
import WarningCard from "../../UI/WarningCard";
import axios from "axios";
function NewFamilyMem() {
    const name = useRef();
    const nationalid = useRef();
    const age = useRef();
    const gender = useRef();
    const relation = useRef();
    const [ok, setOk] = useState(false);
    const [warning, setWarning] = useState("");

    function submitHandler(event) {
        event.preventDefault();

        const nameV = name.current.value.trim();
        const nationalIdV = nationalid.current.value.trim();
        const ageV = age.current.value.trim();
        const genderV = gender.current.value;
        const relationV = relation.current.value;

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
            const newMember = {
                name: nameV,
                nationalID: nationalIdV,
                age: ageV,
                relation: relationV,
                gender: genderV,
            };
            console.log(newMember);
            setWarning("");
            setOk(false);

            axios
            .post("http://localhost:3001/", newMember, {
    
            })
            .then((res) => {
             
            
              nameV.current.value="";
              ageV.current.value=0;
              nationalIdV.current.value=0;
              genderV.current.value="";
              relationV.current.value="";
             
    
            })
            .catch((error) => {
             
                
                
              
            });
        }
    }
    function okHandeler(){
        setOk(false);
    }

    return (
        <div className="flex justify-center mt-10">
            <Card width='w-4/12' height=' h-[32rem]'>
                <div className="flex justify-center mt-10 mb-0">
                    <Logo height='3rem' className='mr-9' />
                    <h1 className="text-xl font-bold text-center text-sky-600 mr-8 mt-3">Add Family Member</h1>
                </div>
                <div className="flex justify-center mt-4 mb-0">
                    <form onSubmit={submitHandler}>
                        <div className="mt-3 ">
                            <div className=" mb-1">
                            <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">Name:</label>
                            <input type="text" id="name" name="name" ref={name} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className=" mb-1">
                            <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">NationalID:</label>
                            <input type="number" id="nationalId" name="nationalId" ref={nationalid} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className=" mb-1">
                            <label className="text-lg font-bold font-SourceSansPro text-gray-500 ml-2">Age:</label>
                            <input type="number" id="age" name="age" ref={age} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                           
                            
                            <div className="mt-1">
                                <GenderSelect ref={gender} />
                            </div>
                            <div className="mt-1">
                                <RelationInputSelect ref={relation} />
                            </div>
                            <button className="text-sky-600 outline w-40 h-9 rounded-md mt-5 shadow ml-9" type="submit">Confirm</button>
                        </div>
                    </form>
                    {ok && <WarningCard width='w-4/12' height=' h-[5rem]' onClick={okHandeler} >{warning}</WarningCard>}
                </div>
                
            </Card>
        </div>
    );
}

export default NewFamilyMem;