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
      <div className="flex">
        {/* Logo covering the whole left side */}
        <Logo height="10rem" className="flex-shrink-0" />

        {/* Right side container */}
        <div className="flex flex-col items-end mt-8 mx-4">
          {" "}
          {/* Added mx-4 for some spacing */}
          <p className="text-lg">Total Amount</p>
          {totalAmount !== undefined && (
            <div className="flex flex-col items-end mt-4">
              <p className="text-xl mb-2">{totalAmount} EGP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyWalletP;
