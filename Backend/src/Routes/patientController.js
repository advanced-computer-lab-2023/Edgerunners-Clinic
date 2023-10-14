// #Task route solution
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const Appointment = require("../Models/Appointment.js");
var bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  await Patient.create({
    Username: req.body.Username,
    Password: await hashPassword(req.body.Password),
    Gender: req.body.Gender,
    Name: req.body.Name,
    Email: req.body.Email,
    phoneNumber: req.body.phoneNumber,
    DOB: req.body.DOB,
    EmergencyContact: {
      FullnameEC: req.body.EmergencyContact.FullnameEC,
      phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
    },
  });
  res.status(200).send("Created successfully");
};

const getPatients = async (req, res) => {
  try {
    const {Name} = req.query;
    const filter = {};
    if (Name){
      filter.Name = Name;
    }
    const Patients = await Patient.find(filter);
    res.status(200).send(Patients);
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};

const filterPatients = async (req, res) => {
  try {
    const { Name, Username, up } = req.query;
    const filter = {};
    const filter2 = {};
    console.log({ Name, Username, up });
    if (Name){
      filter2.PatientUsername = Name;
    }
    if (Username){
      filter.Username = Username;
      filter2.DoctorUsername = Username;
    }
    
    const doctor = await Doctor.findOne(filter);
    const patients = doctor.Patients;
    const r = [];
    const puser = [];
    for(let i = 0; i < patients.length; ++i){
      if(!Name){
        r.push(patients[i].patient);
        puser.push(patients[i].patient.Username);
      }else if(patients[i].patient.Name == Name){
        r.push(patients[i].patient);
        puser.push(patients[i].patient.Username);
      }
    }

    const rr = [];
    for(let i = 0; i < puser.length; ++i){
      filter2.PatientUsername = puser[i];
      const ap = await Appointment.findOne(filter2);
      if(ap && ap.Date >= Date.now()){
        rr.push(ap);
      }
    }

    if(up == "abdo"){
      res.status(200).send(rr);
    }else{
      res.status(200).send(r);
    }
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};

const updatePatient = async (req, res) => {
  //update a Patient in the database
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  try {
    if ((await Patient.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Patient.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete patient !!");
  }
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient, filterPatients };
