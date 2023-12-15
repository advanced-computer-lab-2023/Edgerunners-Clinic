import React from "react";
import { ReactDOM } from "react-dom/client";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import GetPackages from "./getPackages";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PayButton from "./PayButton";
import Footer from "../Patient/Footer";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 1,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
  textAlign: "center",
  zIndex: 2, // Set a higher value to overlap the overlay
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const silverFeatures = [
  "40% off any doctor session",
  "20% off any medicin ordered from pharmacy platform",
  "10% discount on subscription of any family member",
];
const goldFeatures = [
  "60% off any doctor session",
  "30% off any medicin ordered from pharmacy platform",
  "15% discount on subscription of any family member",
];

const platinumFeatures = [
  "80% off any doctor session",
  "40%  off any medicin ordered from pharmacy platform",
  "20% discount on subscription of any family member",
];

export default function Packages() {
  let stripePromise;
  const packages = GetPackages();

  const [isEdit, setEdit] = useState(false);
  const [price, setPrice] = useState(null);
  const [pname, setname] = useState(null);

  function discount() {
    const [discount, setDiscount] = useState();
    useEffect(() => {
      getMyDiscount();
      async function getMyDiscount() {
        const res = await axios.get(`http://localhost:3001/getDiscount`, {
          params: { username: sessionStorage.getItem("Username") },
        });
        setDiscount(res.data);
      }
    }, []);
    return discount;
  }
  let discount3 = discount();

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

  const paywallet = (price, name)=>{
    setPrice(price);
    setname(name);
  }
  const handlewalletPayment = async() =>{
    const res = await axios.post("http://localhost:3001/createHealthPackage",{
      patientUsername: sessionStorage.getItem("Username"),
      packagename: pname
    })
    if(res.data == "you are subscribed to one already"){
      console.log("you are subscribed to one already");
    }else{
      const res2 = await axios.put("http://localhost:3001/PaymentPackageWallet",{
      username: sessionStorage.getItem("Username"),
      price: price,
      discount: discount3
    })
    console.log(res2)
    }
  }
  const handleCheckout = async (name) => {
    let Username = sessionStorage.getItem("Username");
    let PaymentType = "Package";
    let discount = null;
    await axios
      .get("http://localhost:3001/getDiscount", {
        params: { username: sessionStorage.getItem("Username") },
      })
      .then((res) => {
        discount = res.data;
      });
    console.log("I am hereeee" + discount);
    let coupon = null;
    await axios
      .get("http://localhost:3001/create-coupon", {
        params: { coupon: discount },
      })
      .then((res) => {
        coupon = res.data;
      });
    await axios
      .post("http://localhost:3001/create-checkout-session", {
        name,
        Username,
        PaymentType,
        coupon,
      })
      .then((res) => {
        sessionStorage.setItem("flag", false);
        window.location = res.data.url;
      })
      .catch((err) => console.log(err.message));
  };

  // const getStripe = () => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe(
  //       "pk_test_51OAYarCTaVksTfn0OXdujXuGWeTGatBccdz8bPZA0Ug5eERXsvWdeVbYauI2g0Zz2qvS0zVOdgqbZIACjtaKZNOM0068Ao6qVL"
  //     );
  //   }

  //   return stripePromise;
  // };
  // console.log(packages.data);
  // const [stripeError, setStripeError] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // const items = {
  //   price: "price_1OAYdVCTaVksTfn0N2vLYtqO",
  //   quantity: 1,
  // };
  // let lineItems;
  // if(packages.data){
  //  lineItems = packages.data.map((i) =>{
  //   return{
  //     price: i.Price,
  //     quantity: 1
  //   }
  // });

  // const checkoutOptions = {
  //   lineItems: [items],
  //   mode: "payment",
  //   successUrl: `${window.location.origin}/success`,
  //   cancelUrl: `${window.location.origin}/cancel`,
  // };

  // const redirectToCheckout = async () => {
  //   setLoading(true);
  //   console.log("redirectToCheckout");

  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout(checkoutOptions);
  //   console.log("Stripe checkout error", error);

  //   if (error) setStripeError(error.message);
  //   setLoading(false);
  // };

  //if (stripeError) alert(stripeError);

  if (packages.data != null) {
    return (
      <div className="tailwind Bootstrap PatientHome backgroundPicture">
        <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/PatientHome">
              <Logo />
            </a>

            <button
              className="navbar-toggler ps-0"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#pets">
                    Video Call
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#adoptions">
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/myAppointments"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/viewPackage"
                  >
                    My Subscriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/Prescriptions"
                  >
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/myWalletP">
                    My Wallet
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/changePassword"
                  >
                    Change password
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      sessionStorage.removeItem("Username");
                      sessionStorage.removeItem("type");
                      sessionStorage.removeItem("token");
                      window.location.replace("/");
                    }}
                  >
                    Log Out
                  </a>
                </li>
              </ul>

              {/* <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ps-2" href="#!">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="mx-auto max-w-2xl sm:text-center">
          <br />
          <br />
          <br />
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <Carousel className="rounded-x1 ">
          
          {packages.data.map((p, index) => {
            return (
              <div key={p.Name} className=" py-2 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div  style={{ background: "rgb(250,250,250)", borderRadius: "20px 0px 0px 20px" }} className="p-8 sm:p-10 lg:flex-auto">
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                        {p.Name} Membership
                      </h3>
                      <p className="mt-6 text-base leading-7 text-gray-600"></p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
                          What’s included
                        </h4>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                      >
                        <li className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {p.discountDoctor} % off any doctor session
                        </li>
                        <li className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {p.discountMedicin}% off any medicine ordered from
                          pharmacy platform
                        </li>
                        <li className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {p.discountFamily}% discount on subscription of any
                          family member
                        </li>
                      </ul>
                    </div>
                    <div  style={{ background: "rgb(250,250,250)", borderRadius:"0px 20px 20px 0px" }}className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                          <p className="text-base font-semibold text-gray-600"></p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              {p.Price}
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              LE
                            </span>
                          </p>
                          <button
                            href="#"
                            style={{ color:"white" }}
                            className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleCheckout(p.Name)}
                          >
                            Get access
                          </button>
                          {isEdit && (<div style={modalOverlayStyle}>
                            <div style={modalStyle}>
                              <span
                                style={closeButtonStyle}
                                onClick={() => setEdit(false)}
                              >
                                &times;
                              </span>
                              <h2>Checkout:</h2>
                              <p>
                                Your wallet:{" "}
                                {totalAmount != undefined && totalAmount} EGP
                              </p>
                              <p>Package price: {price} EGP</p>
                              <p>discount: {discount3}%</p>
                              <p>
                                total ={" "}
                                {discount3 > 0 &&
                                  price * ((100 - discount3) / 100)}
                                  {discount3 == 0 && price }EGP
                              </p>
                              <button
                                onClick={(e) => {
                                  handlewalletPayment()
                                  setEdit(false);
                                }}
                              >
                                Pay
                              </button>
                              <button
                                onClick={(e) => {
                                  setEdit(false);
                                }}
                              >
                                cancel
                              </button>
                            </div>
                          </div>)}
                          <button
                            href="#"
                            style={{ color:"white" }}
                            className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold  shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {paywallet(p.Price,p.Name);setEdit(true);}}
                          >
                            Pay with wallet
                          </button>
                          <p className="mt-6 text-xs leading-5 text-gray-600"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
        {/* <div >
        <a
           href="http://localhost:5173/CreatePackage"
           className="mt-10 block w- rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
             Create Package
              </a>
        <a
           href="http://localhost:5173/UpdatePackage"
           className="mt-10 block w- rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
             Edit/Delete Packages
              </a>
        </div> */}

        <div className=" py-44 sm:py-55"></div>
        <Footer></Footer>
      </div>
    );
  }
}
