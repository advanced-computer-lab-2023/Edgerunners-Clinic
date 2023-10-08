import React from "react";
import { useState } from "react";
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="discountDoctor">discountDoctor</label>
            <input
              type="number"
              value={discountDoctor}
              onChange={(e) => {
                setdiscountDoctor(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="discountMedicin">discountMedicin</label>
            <input
              type="number"
              value={discountMedicin}
              onChange={(e) => {
                setdiscountMedicin(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="discountFamily">discountFamily</label>
            <input
              type="number"
              value={discountFamily}
              onChange={(e) => {
                setdiscountFamily(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="price">price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <button type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
