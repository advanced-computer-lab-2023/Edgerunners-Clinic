// #Task route solution
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const createDoctor = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  try {
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
  } catch (e) {
    res.status(400).send("Failed to Create Doctor");
  }
};

const getDoctors = async (req, res) => {
  try {
    const Doctors = await Doctor.find();
    res.status(200).send({ data: Doctors });
  } catch (e) {
    res.status(400).send("Error could not get Doctors !!");
  }
};

const updateDoctor = async (req, res) => {
  //update a Doctor in the database
  const user = null;
  if (req.body.Email) {
    Doctor.updateOne({ Username: user }, { $set: { Email: req.body.Email } });
  }
  if (req.body.Hourlyrate) {
    Doctor.updateOne(
      { Username: user },
      { $set: { Hourlyrate: req.body.Hourlyrate } },
    );
  }
  if (req.body.Affiliation) {
    Doctor.updateOne(
      { Username: user },
      { $set: { Affiliation: req.body.Affiliation } },
    );
  }
};

const deleteDoctor = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Doctor.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Doctor.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Doctor !!");
  }
};

module.exports = { createDoctor, getDoctors, updateDoctor, deleteDoctor };
