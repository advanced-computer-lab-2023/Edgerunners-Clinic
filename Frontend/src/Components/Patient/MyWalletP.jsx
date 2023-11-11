import Logo from "../../UI/UX/Logo";
import Card from "../../UI/UX/Card";
import axios from "axios";
import { useState, useEffect } from "react";
function MyWalletP(props) {
  let patientUsername = sessionStorage.getItem("Username");
  function wallet() {
    const [wallet, setWallet] = useState();
    useEffect(() => {
      getMyWallet();
      async function getMyWallet() {
        const res = await axios.get(
          `http://localhost:3001/getWallet/${sessionStorage.getItem(
            "Username"
          )}`
        );
        setWallet(res.data);
      }
    }, []);
    return wallet;
  }
  let totalAmount = wallet();

  return (
    <div className="tailwind">
      <div className="flex justify-center mt-24">
        <Card width="w-4/12" height=" h-[32rem]">
          <div className=" flex">
            <div>
              <Logo height="4rem" />
            </div>
            <div>
              <h1> Welcome {patientUsername}</h1>
            </div>
          </div>

          <br />
          <br />
          {totalAmount != undefined && (
            <h2 className="  text-xl ">
              Total Available Amount is : {totalAmount}
              <button className="">add money</button>
            </h2>
          )}
        </Card>
      </div>
    </div>
  );
}
export default MyWalletP;
