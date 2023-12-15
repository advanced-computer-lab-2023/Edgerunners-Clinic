import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import { useState } from "react";
import React from "react";
import axios from "axios";

export default function CreatePackage() {
  const [name, setName] = useState("");
  const [discountDoctor, setdiscountDoctor] = useState("");
  const [discountMedicin, setdiscountMedicin] = useState("");
  const [discountFamily, setdiscountFamily] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function AddPackages(p) {
      await axios.post("http://localhost:3001/createPackage", p);
    }

    const p = {
      Name: name,
      discountDoctor: discountDoctor,
      discountMedicin: discountMedicin,
      discountFamily: discountFamily,
      Price: price,
    };
    await AddPackages(p);
  };

  return (
    <div className="tailwind">
        <div>
          <a href="/AdminHome">
            <Logo />
          </a>
          <div className=" justify-center flex mt-20">
            <Card width="w-4/12" height=" h-[34rem]" >
              <div className=" flex justify-center  mt-6 mb-0 ">
                <Logo height="4rem" />

                <h1 className=" text-2xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">
                  {" "}
                  Create Package{" "}
                </h1>
              </div>
              <div className=" flex justify-center mt-7">
                  <form onSubmit={handleSubmit}>
                    <div className=" mt-3">
                      <div className=" mb-4">
                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2" htmlFor="name">Name:</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className=" mb-4">
                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2" htmlFor="discountDoctor">Discount for doctor sessions:</label>
                        <input
                          type="number"
                          value={discountDoctor}
                          onChange={(e) => {
                            setdiscountDoctor(e.target.value);
                          }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className=" mb-4">
                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2" htmlFor="discountMedicin">Discount for medicine orders:</label>
                        <input
                          type="number"
                          value={discountMedicin}
                          onChange={(e) => {
                            setdiscountMedicin(e.target.value);
                          }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className=" mb-4">
                        <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2" htmlFor="discountFamily">Discount for family members subscriptions:</label>
                        <input
                          type="number"
                          value={discountFamily}
                          onChange={(e) => {
                            setdiscountFamily(e.target.value);
                          }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className=" mb-4">
                        <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2" htmlFor="discountFamily" htmlFor="price">Price:</label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                        <div className=" flex justify-center  mt-6">
                          <br />
                          <br />
                          <button className="  text-sky-600    w-40  h-9  rounded-md   mt-5 shadow block" type="submit">Submit</button>
                        </div>
                    </div>
                  </form>
                </div>
             </Card>
            </div>
        </div>
    </div>
  );
}
