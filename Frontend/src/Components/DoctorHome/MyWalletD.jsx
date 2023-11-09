import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import axios from "axios";
function MyWalletD(props){
    let doctUsername=sessionStorage.getItem("Username");
    let totalAmount=sessionStorage.getItem("Walltet");
    return(
        <div className="tailwind">
            <div className="flex justify-center mt-24">
            <Card width="w-4/12" height=" h-[32rem]" >
               
                <div  className=" flex">
                    <div><Logo height="4rem" /></div>
                    <div ><h1> Welcome {doctUsername}</h1></div>
                </div>
            
            <h1> Welcome {docUsername}</h1>
            <h2 className="  text-xl ">
                Total Available Amount is : {totalAmount}
            </h2>

            </Card>
            </div>
            
        </div>
    )
}
export default MyWalletD;