import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import axios from "axios";
function MyWalletP(props){
    let patientUsername=sessionStorage.getItem("Username");
    let totalAmount=sessionStorage.getItem("Amount");
    return(
        <div className="tailwind">
            <div className="flex justify-center mt-24">
            <Card width="w-4/12" height=" h-[32rem]" >
                <div  className=" flex">
                    <div><Logo height="4rem" /></div>
                    <div ><h1> Welcome {patientUsername}</h1></div>
                
                </div>
            
            
            <br />
            <br />
            <h2 className="  text-xl ">
                Total Available Amount is : {totalAmount}
                <button className=""></button>
            </h2>

            </Card>
            </div>
            
        </div>
    )
}
export default MyWalletP;