import React from 'react';

function PresForm() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="medicineName">Medicine's Name:</label>
          <input type="text" id="medicineName" name="medicineName" />// i want to save the inputs to be able to use it in another component
        </div>

        <div>
          <label htmlFor="dose">Dose:</label>
          <input type="text" id="dose" name="dose" />
        </div>

        {/* Add a submit button or other form controls if needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PresForm;
