// #Task route solution
const Appointment = require("../Models/Appointment.js");
const { default: mongoose } = require("mongoose");

const createAppointment = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  const startDate = new Date(req.body.Date);
  const intervalInMinutes = 30; // You can adjust this interval as needed
  const endDate = new Date(startDate.getTime() + intervalInMinutes * 60000);
  try {
    
    await Appointment.create({
      PatientUsername: req.body.PatientUsername,
      DoctorUsername: req.body.DoctorUsername,
      Date: startDate,
      EndDate: endDate
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Appointment!!");
  }
};

const getAppointments = async (req, res) => {
  try {
    const Appointments = await Appointment.find();
    res.status(200).send({ data: Appointments });
  } catch (e) {
    res.status(400).send("Error could not get Appointments !!");
  }
};

const updateAppointment = async (req, res) => {
  //update a Doctor in the database
};

const deleteAppointment = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Appointment.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("Appointment Not Found");
    } else {
      await Appointment.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Appointment !!");
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
