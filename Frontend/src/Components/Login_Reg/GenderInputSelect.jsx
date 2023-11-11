import React from 'react';

const GenderInputSelect = (props) =>
  <select {...props}  className="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
    <option>Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

export default GenderInputSelect;