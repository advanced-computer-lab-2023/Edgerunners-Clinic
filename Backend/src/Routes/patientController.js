// #Task route solution
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age

  await Patient.create({
    Username: req.body.Username,
    Password: req.body.Password,
    Gender: req.body.Gender,
    Name: req.body.Name,
    Email: req.body.Email,
    phoneNumber: req.body.phoneNumber,
  
    DOB: req.body.DOB,
    EmergencyContact: {
      FullnameEC: req.body.Fullnameec,
      phoneNumberEC: req.body.phoneNumberec,
    },
  });
  res.status(200).send("Created successfully");
};

const getPatients = async (req, res) => {
  const Patients = await Patient.find();
  res.status(200).send({ data: Patients });
};

const updatePatient = async (req, res) => {
  //update a Patient in the database
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  await Patient.deleteMany();
  res.status(200).send("Deleted successfully");
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
