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
      await axios.post("http://localhost:3005/createPackage", p);
    }

    const p = {
      Name: name,
      discountDoctor: discountDoctor,
      discountMedicin: discountMedicin,
      discountFamily: discountFamily,
      Price: price,
    };
    await AddPackages(p);
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1> Create Package </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="discountDoctor">
                    Discount for doctor sessions:
                  </label>
                  <br />
                  <input
                    type="number"
                    value={discountDoctor}
                    onChange={(e) => {
                      setdiscountDoctor(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="discountMedicin">
                    Discount for medicine orders:
                  </label>
                  <br />
                  <input
                    type="number"
                    value={discountMedicin}
                    onChange={(e) => {
                      setdiscountMedicin(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="discountFamily">
                    Discount for family members subscriptions:
                  </label>
                  <br />
                  <input
                    type="number"
                    value={discountFamily}
                    onChange={(e) => {
                      setdiscountFamily(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="discountFamily" htmlFor="price">
                    Price:
                  </label>
                  <br />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
          {/*</Card>*/}
        </div>
      </div>
    </div>
  );
}
