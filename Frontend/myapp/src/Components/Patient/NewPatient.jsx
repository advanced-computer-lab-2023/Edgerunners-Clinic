import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import SelectGender from "../../UI/UX/SelectGender";
import { useRef } from "react";
import Dropdown from "../../UI/UX/DropDown";
function NewPatient(props){
const name= useRef();
const nationalId= useRef();
const age = useRef();
const relation = useRef();
const gender= useRef();

    function submitHandler(event){
        event.preventDefault();
        const nameV = name.current.value;
        const nationalIdV = nationalId.current.value;
        const ageV = age.current.value;
        //const relationV = relation.current.value;
        const genderV=gender.current.value;
       const newMember={
        name:nameV,
        nationalID:nationalIdV,
        age:ageV,
        //relation:relationV,
        gender: genderV,
       };
       console.log(newMember);
    }

    return(
        <div className=" flex justify-center mt-10">
        <Card width='w-4/12' height=' h-[34rem]'>
               <div className=" flex justify-center  mt-10 mb-0 ">
            <Logo height='3rem' className='mr-9' />
        <h1 className=" text-xl font-bold  text-center  text-sky-600   mr-8 mt-3 "> Add Family Member </h1>
        </div >
        <div className=" flex justify-center  mt-4 mb-0 ">
        <form onSubmit={submitHandler}>
            <div className=" mt-3">
            <div >
            <label className=" text-lg font-bold   font-SourceSansPro  text-gray-500 ml-2"> Name : </label>
            <br />
            <input type="text" id="name" name="name"  ref={name}  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <div >
            <label className=" text-lg font-bold   font-SourceSansPro  text-gray-500 ml-2"> NationalID : </label>
            <br />
            <input type="number" id="nationalId" name="nationalId"  ref={nationalId}  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <div >
            <label className="  text-lg font-bold   font-SourceSansPro  text-gray-500 ml-2"> Age: </label>
            <br />
            <input type="number" id="age" name="age" ref={age}   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <Dropdown ref={relation}/>
            <SelectGender SelectGenderRef={gender}/>
            <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow  ml-9" > Confirm </button>
            </div>
        </form>
        </div>
        </Card>
        </div>
    )
}
export default  NewPatient;