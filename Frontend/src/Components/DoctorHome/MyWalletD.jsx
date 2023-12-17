import axios from "axios";
import { useState, useEffect } from "react";

function MyWalletD(props) {
  let doctUsername = sessionStorage.getItem("Username");
  console.log();
  function wallet() {
    const [wallet, setWallet] = useState();
    useEffect(() => {
      getMyWallet();
      async function getMyWallet() {
        const res = await axios.get(
          `http://localhost:3005/getWalletD/${sessionStorage.getItem(
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
    <div>
      {totalAmount != undefined && (
        <h3>Total Available Amount is : {parseInt(totalAmount)}</h3>
      )}
    </div>
  );
}
export default MyWalletD;
