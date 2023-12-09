import { useState, useRef, useEffect } from "react";
import React from "react";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";

function ViewPresc() {
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getPrescriptions",
          {
            params: {
              Username: x,
            },
          }
        );

        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };
    fetchData();
  }, []);

  if (prescriptions != null) {
    return (
      <div className="tailwind">
        <a href="/PatientHome">
          <Logo />
        </a>
        <div className="bg-white py-30 sm:py-4"></div>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Prescriptions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <Carousel className="rounded-x1" autoplay={true} loop={true}>
          {prescriptions.map((p, index) => {
            return (
              <div key={p.Patient} className="bg-white py-2 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Doctor : {p.Doctor}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-gray-600"></p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h3 className="flex-none text-sm font-semibold leading-6  text-gray-600">
                          Status:{p.Status}
                          <br />
                          Date: {new Date(p.Date).toLocaleDateString()}
                        </h3>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
        <div className="bg-white py-44 sm:py-55"></div>
      </div>
    );
  }
}
export default ViewPresc;
