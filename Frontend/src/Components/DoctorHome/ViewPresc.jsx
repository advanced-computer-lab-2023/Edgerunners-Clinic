import React, { useState, useEffect, useRef } from "react";
import Logo from "../../UI/UX/Logo";
import axios from "axios";
import MedicinesDropDown from "../../UI/UX/MedicinesDropDown";


function ViewPresc() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [updateData, setUpdateData] = useState({
    prescriptionId: "",
    medicineName: "",
    newDose: "",
  });
  const [delData, setDelData] = useState({
    prescriptionId: "",
    medicineName: "",
    newDose: "",
  });
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);

  const newMedAdded = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePrescriptions = await axios.get(
          "http://localhost:3001/getPrescriptions",
          {
            params: {
              Doctor: sessionStorage.getItem("Username"),
            },
          }
        );
        setPrescriptions(responsePrescriptions.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (prescriptionId, medicineName) => {
    setUpdate(true);
    setUpdateData({
      prescriptionId,
      medicineName,
      newDose: "", // Reset newDose when clicking update
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/updatePrescriptions",
        {
          ...updateData,
        }
      );
      setUpdate(false);
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  const handleDelete = async (prescriptionId, medicineName) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/removemedicine",
        {
          prescriptionId: prescriptionId,
          medicineNameToRemove: medicineName,
        }
      );
      setUpdate(false);
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleAddNewMedicine = (prescriptionId) => {
    setUpdate(false); // Make sure update is set to false
    setAdd(true);
    setDelData({
      prescriptionId,
      medicineName: "", // Reset medicineName
      newDose: "", // Reset newDose when clicking update
    });
  };
  const handlSubmitingMedicine = async (prescriptionId) => {
    // Set add to false
    setAdd(false);
  
    // Get the selected medicine from the dropdown list
    const newMedicineName = newMedAdded.current.value;
  console.log(newMedicineName)
    try {
      // Make axios PUT request
      const response = await axios.put(
        "http://localhost:3001/updatePrescriptions",
        {
          prescriptionId: prescriptionId,
          newMedicineName: newMedicineName,
          newMedicineDose: delData.newDose,
        }
      );
  
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
    window.location.reload();
    // Reset state for newDose
    setDelData({
      prescriptionId,
      medicineName: "",
      newDose: "",
    });
  };

  if (prescriptions != null) {
    return (
      <div className="tailwind">
        <a href="/DoctorHome">
          <Logo />
        </a>
        <div className="bg-white py-30 sm:py-4"></div>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Prescriptions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>

        <div className="flex flex-wrap justify-evenly">
        {prescriptions.map((p, index) => {
            return (
              <div
                key={index}

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
                    <li>
                      <div>
                      {medicine.name} - {medicine.dose}
                      </div>
                      
                      <button onClick={() =>{handleUpdate(p._id,medicine.name);console.log(medicine.name)}}>Update</button>
                      <button onClick={() =>{ handleDelete(p._id, medicine.name)}}>Delete</button>
                    </li>
                  ))}
                </ul>
                {update && updateData.prescriptionId===p._id&&(
                    <div>
                      <div>
                      <input
                        type="text"
                        value={updateData.newDose}
                        onChange={(e) => setUpdateData({ ...updateData, newDose: e.target.value })}
                      />
                      </div>
                   
                      <button onClick={()=>handleUpdateSubmit()}>Submit Update</button>
                    </div>
                  )}
                <button onClick={() => handleAddNewMedicine(p._id)}>Add New Medicine</button>
                {add && delData.prescriptionId === p._id && (
          <div>
            <div>
              {/* Dropdown for existing medicines */}
              <MedicinesDropDown ref={newMedAdded}/>
            </div>
            <div>
              {/* Textbox for newDose */}
              <input
                type="text"
                value={delData.newDose}
                onChange={(e) =>
                  setDelData({
                    ...delData,
                    newDose: e.target.value,
                  })
                }
              />
            </div>
            <button onClick={() => handlSubmitingMedicine(p._id)}>
              Submit
            </button>
          </div>
        )}
                <div >
     
      
    </div>
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

