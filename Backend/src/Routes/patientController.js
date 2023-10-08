// #Task route solution
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  try {
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
  }catch(e){
    res.status(400).send("Failed to Create User");
  }
  
  
};

const getPatients = async (req, res) => {
  try{
    const Patients = await Patient.find();
    res.status(200).send({ data: Patients });
  }catch(e){
    res.status(400).send("Error could not get Patients !!");
  }
  
};

const updatePatient = async (req, res) => {
  //update a Patient in the database
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  try{
    if(await Patient.find({Username: req.body.Username}).length == 0){
      res.status(300).send("User Not Found");
    }else{
      await Patient.deleteOne({Username: req.body.Username})
      res.status(200).send("Deleted successfully");
    }
  }catch(e){
    res.status(400).send("Error could not delete patient !!");
  }
  
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
