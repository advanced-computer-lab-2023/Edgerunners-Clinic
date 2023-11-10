import axios from "axios";


const PayButton = (name) => {
    const handleCheckout = async() => {
         await axios.post("http://localhost:3001/create-checkout-session",{
            name
        })
        .then((res)=>{
            window.location = res.data.url
        }).catch((err) => console.log(err.message));
    }
    return(
      <button onClick={() => handleCheckout()}>Check Out</button>  
    );
};

export default PayButton