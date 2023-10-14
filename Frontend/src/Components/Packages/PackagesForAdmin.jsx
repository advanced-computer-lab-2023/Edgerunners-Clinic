import React from "react";
import { ReactDOM } from "react-dom/client";
import Logo from "../../UI/UX/Logo";

import GetPackages from "./getPackages";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { CheckIcon } from '@heroicons/react/20/solid';

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




// export default function Packages() {
//   const packages = GetPackages();
//   if (packages.data != null) {
//     return (
//       <div className="tailwind">
//       <div className="bg-white py-30 sm:py-4"></div>
//       <div className="bg-white py-2 ">
//         <div className="mx-auto max-w-7x1 px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl sm:text-center">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Health Care Packages
//             </h2>
//       {/* <Carousel className="rounded-x1" autoplay="true" loop="true"> */}
        
//         {packages.data.map((p, index) => {
//           return (
//             <div
//             key={index}
//           >
//               <div className=" mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
//                 <div className="p-8 sm:p-10 lg:flex-auto">
//                   <h3 className="text-2xl font-bold tracking-tight text-gray-900">{p.Name}</h3>
//                   <p className="mt-6 text-base leading-7 text-gray-600">

//                   </p>
//                   <div className="mt-10 flex items-center gap-x-4">
//                     <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
//                     <div className="h-px flex-auto bg-gray-100" />
//                   </div>
//                   <ul
//                     role="list"
//                     className="mt-8 grid grid-cols-1 gap-1 text-sm leading-7 text-gray-600 sm:grid-cols-10 sm:gap-6"
//                   >
//                        <li key={p.discountDoctor} className="flex gap-x-1">
//                         <CheckIcon
//                           className="h-6 w-5 flex-none text-indigo-600"
//                           aria-hidden="true"
//                         />
//                         {p.discountDoctor}% off any doctor session
//                       </li>
//                       <li>
//                         <CheckIcon
//                           className="h-6 w-5 flex-none text-indigo-600"
//                           aria-hidden="true"
//                         />
//                         {p.discountMedicin}% off any medicin ordered from
//                         pharmacy platform
//                       </li>
//                       <li key={p.discountFamily} className="flex gap-x-3">
//                         <CheckIcon
//                           className="h-6 w-5 flex-none text-indigo-600"
//                           aria-hidden="true"
//                         />
//                         {p.discountFamily}% discount on subscription of any
//                         family member
//                       </li>
//                   </ul>
//                 </div>
//                   <div className="rounded-5xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
//                     <div className="mx-auto max-w-xs px-8">
//                       <p className="text-base font-semibold text-gray-600"></p>
//                       <p className="mt-6 flex items-baseline justify-center gap-x-2">
//                         <span className="text-5xl font-bold tracking-tight text-gray-900">{p.Price}</span>
//                         <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">LE</span>
//                       </p>
//                       <a
//                         href="#"
//                         className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       >
//                         Get access
//                       </a>
//                       <p className="mt-6 text-xs leading-5 text-gray-600">
//                       </p>
//                     </div>
//                   </div>

//               </div>
//               </div>
//           )
//           })}
//           {/* </Carousel> */}
//           </div>
//           </div>
//           </div>
//           </div>
//         );
//       }
//     }








        
            // <div key={index} className="relative h-full w-full">
            //   <img
            //     src="https://img.freepik.com/premium-photo/blue-white-futuristic-background-with-medicine-symbols_215274-1760.jpg?w=1060"
            //     alt={p.Name}
            //     className="h-full w-full object-cover"
            //   />
            //   <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            //     <div className="w-3/4 text-center md:w-2/4">
            //       <Typography
            //         variant="h1"
            //         color="white"
            //         className="mb-12 text-3xl md:text-4xl lg:text-5xl"
            //       >
            //         {p.Name}
            //       </Typography>
            //       <Typography
            //         variant="lead"
            //         color="white"
            //         className="mb-12 opacity-80"
            //       >
            //         ✔️
            //         {p.discountDoctor}% off any doctor session
            //       </Typography>
            //       <Typography
            //         variant="lead"
            //         color="white"
            //         className="mb-12 opacity-80"
            //       >
            //         ✔️
            //         {p.discountMedicin}% off any medicine ordered from the
            //         pharmacy platform
            //       </Typography>
            //       <Typography
            //         variant="lead"
            //         color="white"
            //         className="mb-12 opacity-80"
            //       >
            //         ✔️
            //         {p.discountFamily}% discount on the subscription of any
            //         family member
            //       </Typography>
            //       <div className="flex justify-center gap-2">
            //         <Button size="lg" color="white">
            //           Get Access!
            //         </Button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
//             <div
//             key={index}
//             className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
//           >
//             <div className="p-10 sm:p-10 lg:flex-auto">
//               <h3 className="text-2xl font-bold tracking-tight text-gray-900">
//                 {p.Name}
//               </h3>
//               <p className="mt-6 text-base leading-7 text-gray-600"></p>
//               <div className="mt-10 flex items-center gap-x-4">
//                 <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
//                   What’s included
//                 </h4>
//                 <div className="h-px flex-auto bg-gray-100" />
//               </div>
//               <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
//                 <li key={p.discountDoctor} className="flex gap-x-3">
//                   <CheckIcon
//                     className="h-6 w-5 flex-none text-indigo-600"
//                     aria-hidden="true"
//                   />
//                   {p.discountDoctor}% off any doctor session
//                 </li>
//                 <li
//                   key={p.discountMedicin}
//                   className="flex gap-x-3"
//                 ></li>
//                 <li>
//                   <CheckIcon
//                     className="h-6 w-5 flex-none text-indigo-600"
//                     aria-hidden="true"
//                   />
//                   {p.discountMedicin}% off any medicin ordered from
//                   pharmacy platform
//                 </li>
//                 <li key={p.discountFamily} className="flex gap-x-3">
//                   <CheckIcon
//                     className="h-6 w-5 flex-none text-indigo-600"
//                     aria-hidden="true"
//                   />
//                   {p.discountFamily}% discount on subscription of any
//                   family member
//                 </li>
//               </ul>
//             </div>
//             <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
//               <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
//                 <div className="mx-auto max-w-xs px-8">
//                   <p className="text-base font-semibold text-gray-600"></p>
//                   <p className="mt-6 flex items-baseline justify-center gap-x-2">
//                     <span className="text-5xl font-bold tracking-tight text-gray-900">
//                       {p.Price}
//                     </span>
//                     <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
//                       LE
//                     </span>
//                   </p>
//                   <a
//                     href="#"
//                     className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Get access
//                   </a>
//                   <p className="mt-6 text-xs leading-5 text-gray-600"></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       {/* </Carousel> */}
//       </div>
//       </div>
//       </div>
//        </div>
//     );
//   }
// }
//   return (
//     <div className="tailwind">
      // <div className="bg-white py-30 sm:py-4"></div>
      // <div className="bg-white py-2 ">
      //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
      //     <div className="mx-auto max-w-2xl sm:text-center">
      //       <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      //         Health Care Packages
      //       </h2>
//             {packages.data.map((p, index) => {
  //             return (
                // <div
                //   key={index}
                //   className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
                // >
    //               <div className="p-8 sm:p-10 lg:flex-auto">
    //                 <h3 className="text-2xl font-bold tracking-tight text-gray-900">
    //                   {p.Name}
    //                 </h3>
    //                 <p className="mt-6 text-base leading-7 text-gray-600"></p>
    //                 <div className="mt-10 flex items-center gap-x-4">
    //                   <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
    //                     What’s included
    //                   </h4>
    //                   <div className="h-px flex-auto bg-gray-100" />
    //                 </div>
                    // <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                      // <li key={p.discountDoctor} className="flex gap-x-3">
                      //   <CheckIcon
                      //     className="h-6 w-5 flex-none text-indigo-600"
                      //     aria-hidden="true"
                      //   />
                      //   {p.discountDoctor}% off any doctor session
                      // </li>
                      // <li
                      //   key={p.discountMedicin}
                      //   className="flex gap-x-3"
                      // ></li>
                      // <li>
                      //   <CheckIcon
                      //     className="h-6 w-5 flex-none text-indigo-600"
                      //     aria-hidden="true"
                      //   />
                      //   {p.discountMedicin}% off any medicin ordered from
                      //   pharmacy platform
                      // </li>
                      // <li key={p.discountFamily} className="flex gap-x-3">
                      //   <CheckIcon
                      //     className="h-6 w-5 flex-none text-indigo-600"
                      //     aria-hidden="true"
                      //   />
                      //   {p.discountFamily}% discount on subscription of any
                      //   family member
                      // </li>
                    // </ul>
    //               </div>
    //               <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
    //                 <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
    //                   <div className="mx-auto max-w-xs px-8">
    //                     <p className="text-base font-semibold text-gray-600"></p>
    //                     <p className="mt-6 flex items-baseline justify-center gap-x-2">
    //                       <span className="text-5xl font-bold tracking-tight text-gray-900">
    //                         {p.Price}
    //                       </span>
    //                       <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
    //                         LE
    //                       </span>
    //                     </p>
    //                     <a
    //                       href="#"
    //                       className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                     >
    //                       Get access
    //                     </a>
    //                     <p className="mt-6 text-xs leading-5 text-gray-600"></p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  // );
// }
// export default function Packages() {
//   const packages = GetPackages();
//   if (packages.data != null) {
//     return (
//         {
          // packages.data.map((p, index) => {
          //   return ()
//           }
//         }
//     )
//   }

// }
   export default function Packages(){
      const packages = GetPackages();
      if(packages.data != null){
        
      
    return (
    <div className="tailwind">
      <a href="/AdminHome">
        <Logo />
      </a>
        <div className="bg-white py-30 sm:py-4" ></div>
        <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Health Care Packages</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">

              </p>
        </div>
        <Carousel className="rounded-x1" autoplay="true" loop="true"> 
        {packages.data.map((p, index) => {
          return (
            <div className="bg-white py-2 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{p.Name} membership</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">

                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">What’s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                <li  className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {p.discountDoctor} % off any doctor session
              </li>
              <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {p.discountMedicin}% off any medicin ordered from pharmacy platform
                      
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {p.discountFamily}% discount on subscription of any family member
                    </li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600"></p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">{p.Price}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">LE</span>
                    </p>
                    <a
                      href="#"
                      className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get access
                    </a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )
        })}
        </Carousel>
        <div >
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
        </div>

        <div className="bg-white py-44 sm:py-55" ></div>
    </div>

      )
    }
}


