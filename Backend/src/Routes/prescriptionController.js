// #Task route solution
const prescriptions = require("../Models/Prescriptions.js");
const { default: mongoose } = require("mongoose");

const createPrescriptions = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  await prescriptions.create({
    Patient: req.body.Patient,
    Status: req.body.Status,
    Doctor: req.body.Doctor,
    Date: req.body.Date,
  });
  res.status(200).send("Created successfully");
};

const getPrescriptions = async (req, res) => {
  try {
    const { Date, Doctor, Patient ,Status } = req.query;
    const filter = {};
    filter.username = req.body.username;
    if (Date) {
      console.log("hi");
      filter.Date = Date + "T22:00:00.000Z";
    }
    if (Doctor) {
      filter.Doctor = Doctor;
    }
    if (Status) {
      filter.Status = Status;
    }
    if(Patient){
      filter.Patient = Patient;
    }
    const Prescription = await prescriptions.find(filter);
    res.status(200).send(Prescription);
  } catch (e) {
    res.status(400).send("Error could not get Prescription !!");
  }
};

const updatePrescriptions = async (req, res) => {
  //update a Patient in the database
  await prescriptions.updateOne({} & {});
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
};
