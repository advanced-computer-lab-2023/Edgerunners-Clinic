import React, { useState, useEffect,forwardRef } from 'react';
import axios from 'axios';

const MedicinesDropDown = forwardRef( (props,ref) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [med, setMedicine] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // Ensure that props.SelectMedrRef.current is defined before updating it
    if (props.SelectMedrRef.current) {
      props.SelectMedrRef.current = event.target.value;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMedicines = await axios.get(
          "http://localhost:3005/getMedicine"
        );
        setMedicine(responseMedicines.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-4 flex mr-5">
      <select
        value={selectedOption}
        ref={ref}
        onChange={handleOptionChange}
        className="border p-2"
      >
        <option value="" disabled>Select a medicine</option>
        {med.map((medicine) => (
          <option key={medicine.id} value={medicine.id}>
            {medicine.Name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default MedicinesDropDown;
