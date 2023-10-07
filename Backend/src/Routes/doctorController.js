// #Task route solution
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const createDoctor = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age

  await Doctor.create({
    Username: req.body.Username,
    Password: req.body.Password,
    DOB: req.body.DOB,
    Name: req.body.Name,
    Email: req.body.Email,
    Hourlyrate: req.body.Hourlyrate,
    Affiliation: req.body.Affiliation,
    Education: req.body.Education,
    
  });
  res.status(200).send("Created successfully");
};

const getDoctors = async (req, res) => {
  const Doctors = await Doctor.find();
  res.status(200).send({ data: Doctors });
};

const updateDoctor = async (req, res) => {
  //update a Doctor in the database
};

const deleteDoctor = async (req, res) => {
  //delete a Doctor from the database
  await Doctor.deleteMany();
  res.status(200).send("Deleted successfully");
};

module.exports = { createDoctor, getDoctors, updateDoctor, deleteDoctor };
