import React, { forwardRef } from 'react';

const Roles = forwardRef((props, ref) => {
    return (
        <select ref={ref} class="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Select Relation</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
        </select>
    );
});

export default Roles;