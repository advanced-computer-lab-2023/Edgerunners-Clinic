// #Task route solution
const Appointment = require("../Models/Appointment.js");
const { default: mongoose } = require("mongoose");

const createAppointment = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  try {
    await Appointment.create({
      PatientUsername: req.body.patientUsername,
      DoctorUsername: req.body.doctorUsername,
      Date: req.body.Date,
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Admin !!");
  }
};

const getAppointments = async (req, res) => {
  try {
    const Appointments = await Appointment.find();
    res.status(200).send({ data: Appointments });
  } catch (e) {
    res.status(400).send("Error could not get Admins !!");
  }
};

const updateAppointment = async (req, res) => {
  //update a Doctor in the database
};

const deleteAppointment = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Appointment.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Appointment.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Admin !!");
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
