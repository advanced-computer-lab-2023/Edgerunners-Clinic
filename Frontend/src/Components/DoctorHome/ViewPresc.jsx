import React, { useState, useEffect } from "react";
import Logo from "../../UI/UX/Logo";
import axios from "axios";

function ViewPresc() {
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getPrescriptions",
          {
            params: {
              Doctor: sessionStorage.getItem("Username"),
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
        <div className="flex flex-wrap  justify-evenly ">
          {prescriptions.map((p, index) => {
            return (
              <div
                key={p.Patient}
                className="bg-white py-2 mb-10 mx-22  rounded-3xl ring-1 ring-gray-200"
              >
                <div className="mx-auto max-w-2xl p-8 sm:p-10">
                  <div className="mt-16 lg:flex lg:max-w-none">
                    <div className="lg:flex-auto">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Patient: {p.Patient}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-gray-600"></p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h3 className="flex-none text-sm font-semibold leading-6 text-gray-600">
                          Status: {p.Status}
                          <br />
                          Date: {new Date(p.Date).toLocaleDateString()}
                          <br />
                          Submitted: {p.Submitted ? "Yes" : "No"}
                          <br />
                          <h4 className="flex-none text-sm font-semibold leading-6 text-gray-600">
                            Required Medicines:
                            <ul>
                              {p.RequiredMedicines.map((medicine, index) => (
                                <li key={index}>
                                  {medicine.name} - {medicine.dose}
                                </li>
                              ))}
                            </ul>
                          </h4>
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
        </div>
        <div className="bg-white py-44 sm:py-55"></div>
      </div>
    );
  }
}

export default ViewPresc;
