import React from "react";
import { ReactDOM } from "react-dom/client";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import GetPackages from "./getPackages";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PayButton from "./PayButton";

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
  const handleCheckout = async (name) => {
    let Username = sessionStorage.getItem("Username");
    let PaymentType = "Package"
    await axios
      .post("http://localhost:3001/create-checkout-session", {
        name,Username , PaymentType
      })
      .then((res) => {
        sessionStorage.setItem("flag",false);
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
      <div className="tailwind">
        <a href="/PatientHome">
          <Logo />
        </a>
        <div className="bg-white py-30 sm:py-4"></div>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Health Care Packages
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <Carousel className="rounded-x1" autoplay={true} loop={true}>
          {packages.data.map((p, index) => {
            return (
              <div key={p.Name} className="bg-white py-2 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                        {p.Name} membership
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
                          {p.discountMedicin}% off any medicin ordered from
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
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
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
                            className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={()=> handleCheckout(p.Name)}
                          >
                            Get access
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

        <div className="bg-white py-44 sm:py-55"></div>
      </div>
    );
  }
}
