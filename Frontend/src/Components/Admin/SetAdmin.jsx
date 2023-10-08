import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useRef,useState } from "react"; 
import axios from "axios";
import WarningCard from "../../UI/WarningCard";

function SetAdmin(props){
    const usernameRef=useRef();
    const passwordRef=useRef();
    const passwordConRef=useRef();
    const [warning,setWarning] = useState("");
    const [ok,setOk]= useState(false); 
    
    function okHandeler(){
        setOk(false);
    }

    function confirmHandeler(event){
        const usernameValue= usernameRef.current.value;
        const passwordValue= passwordRef.current.value;
        
        const newAdmin={
            Username: usernameValue,
            Password:passwordValue,
        };
        
        if (!usernameValue) {
            setWarning("Please enter your name");
            setOk(true);
        } else if (!passwordValue) {
            setWarning("Please enter your password");
            setOk(true);
        }  else if ((!passwordConRef.current.value) || passwordConRef.current.value!==passwordValue) {
            setWarning("Confirmed Password does not match your new password");
            setOk(true);
        }
        else{
            axios
        .post("http://localhost:3001/addAdmin", newAdmin, {

        })
        .then((res) => {
         
        
          usernameRef.current.value="";
          passwordRef.current.value="";
          passwordConRef.current.value="";
         

        })
        .catch((error) => {
         
            setOk(true);
            setWarning("username already exists")
          
        });
        }

    }

    function submitHandeler(event){
        event.preventDefault();
       

       
    }
   

return(
    <div className=" justify-center flex mt-20">
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

                <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow block" type="submit" onClick={confirmHandeler}> Confirm </button>
             </div> 

            </div>
          </form>
        </div>

    </Card>
    {ok && <WarningCard width='w-4/12' height=' h-[5rem]' onClick={okHandeler} >{warning}</WarningCard>}
    </div>
  );
}
export default SetAdmin;
