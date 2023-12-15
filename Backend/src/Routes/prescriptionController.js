// #Task route solution
const prescriptions = require("../Models/Prescriptions.js");
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const createPrescriptions = async (req, res) => {
  try {
    // Check if the Patient and Doctor exist
    const p = await Patient.findOne({ Username: req.body.Patient });
    const d = await Doctor.findOne({ Username: req.body.Doctor });

    if (p && d) {
     console.log(p);
      await prescriptions.create({
        Patient: req.body.Patient,
        Status: req.body.Status,
        Doctor: req.body.Doctor,
        Date: req.body.Date,
        Submitted: req.body.Submitted,
        RequiredMedicines: req.body.RequiredMedicines,
      });

      res.status(200).json({ message: "Prescription created successfully"});
    } else {
      res.status(404).json({ message: "Patient or Doctor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const { Date, Doctor, Patient, Status } = req.query;
    const filter = {};
    if (Date) {
      console.log("hi");
      filter.Date = Date + "T08:00:00.000Z";
    }
    if (Doctor) {
      filter.Doctor = Doctor;
    }
    if (Status) {
      filter.Status = Status;
    }
    if (Patient) {
      filter.Patient = Patient;
    }
    const Prescription = await prescriptions.find(filter);
    res.status(200).send(Prescription);
  } catch (e) {
    res.status(400).send("Error could not get Prescription !!");
  }
};

const updatePrescriptions = async (req, res) => {
  try {
    const { prescriptionId, medicineName, newDose, newMedicineName, newMedicineDose } = req.body;
    const prescription = await prescriptions.findOne({
      _id: prescriptionId,
      Submitted: false,
    });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found or already submitted" });
    }
    if(medicineName &&newDose){
      console.log(prescription);
    const medicineToUpdate = prescription.RequiredMedicines.find((med) => med.name === medicineName);
    const medicineIndexToRemove = prescription.RequiredMedicines.findIndex((med) => med.name === medicineName);
    if (medicineIndexToRemove !== -1) {
      // Remove the medicine from the RequiredMedicines array
      prescription.RequiredMedicines.splice(medicineIndexToRemove, 1);
      prescription.RequiredMedicines.push({ name: medicineName, dose: newDose });
      // Save the updated prescription
      await prescription.save();
      res.status(200).json({ message: "Prescription updated successfully", prescription });
   
   }}
    else{
    prescription.RequiredMedicines.push({ name: newMedicineName, dose: newMedicineDose });
    await prescription.save();
    res.status(200).json({ message: "Prescription updated successfully", prescription });}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removemedicine = async (req, res) => {
  try {
    const { prescriptionId, medicineNameToRemove } = req.body;

    const prescription = await prescriptions.findOne({
      _id: prescriptionId,
      Submitted: false,
    });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found or already submitted" });
    }

    const medicineIndexToRemove = prescription.RequiredMedicines.findIndex((med) => med.name === medicineNameToRemove);

    if (medicineIndexToRemove !== -1) {
      // Remove the medicine from the RequiredMedicines array
      prescription.RequiredMedicines.splice(medicineIndexToRemove, 1);

      // Save the updated prescription
      await prescription.save();

      return res.status(200).json({ message: "Medicine removed successfully", prescription });
    } else {
      return res.status(404).json({ message: "Medicine not found in the prescription" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePrescriptions = async (req, res) => {
  //delete a Patient from the database
  try {
    if (
      (await prescriptions.find({ Username: req.body.Username }).length) === 0
    ) {
      res.status(300).send("Prescription Not Found");
    } else {
      await prescriptions.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Prescription !!");
  }
};

module.exports = {
  createPrescriptions,
  getPrescriptions,
  updatePrescriptions,
  deletePrescriptions,
  removemedicine,
};
