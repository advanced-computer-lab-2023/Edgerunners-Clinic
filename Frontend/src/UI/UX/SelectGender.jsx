import React, { useState ,useRef} from 'react';
import RadioButton from './RadioButton';

const SelectGender = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
const SelectGenderRef=useRef();
  const handleOptionChange = (id) => {
    setSelectedOption(id);
    props.SelectGenderRef.current =id;
  };

  const radioOptions = [
    { id: 1, label: 'female' },{ id: 2, label: 'Male' },
  ];

  return (
    <div className="container mx-auto  mt-4 flex  mr-5">
      
      {radioOptions.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          label={option.label}
          selected={selectedOption === option.id}
          onChange={handleOptionChange}
        />
      ))}
    </div>
  );
};

export default SelectGender;