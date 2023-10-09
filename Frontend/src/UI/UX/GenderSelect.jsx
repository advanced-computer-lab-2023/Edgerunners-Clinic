import React, { forwardRef } from 'react';

const GenderInputSelect = forwardRef((props, ref) => {
    return (
        <select ref={ref} className ="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
    );
});

export default GenderInputSelect;