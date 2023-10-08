import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
function EditMyProf(props){
    return (
        <div className=" tailwind">
            <div className=" flex justify-center mt-8 mb-7">
                <Card width='w-4/12' height=' h-[32rem]' >
                <div className=" flex justify-center  mt-6 mb-0 ">
                <Logo height='4rem'/>
                <h1 className=" text-2xl font-bold  text-center   text-blue-gray-600 ml-0   mt-6 ">  My Profile </h1>
                </div>
                <div className="  mt-7">
                    <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 " >Username:Roaa</h2>
                </div>
                <div className="  mt-7">
                    <h2 className="  text-xl font-bold  text-center  text-sky-600  ml-0   mt-6 " >Password:123</h2>
                </div>
                </Card>

            </div>
        </div>
    )
}
export default EditMyProf;