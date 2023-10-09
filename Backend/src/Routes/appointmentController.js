// #Task route solution
const Appointment = require("../Models/Appointment.js");
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const createAppointment = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  const startDate = new Date(req.body.Date);
  const intervalInMinutes = 30; // You can adjust this interval as needed
  const endDate = new Date(startDate.getTime() + intervalInMinutes * 60000);
    let isValid = true
    const patient  = await Patient.findOne({Username: req.body.PatientUsername})
    const doctor = await Doctor.findOne({Username:req.body.DoctorUsername})
    if(!patient || !doctor){
      isValid=false
    }
    if(isValid){
      console.log(req.body.Date)
      await Appointment.create({
        PatientUsername: req.body.PatientUsername,
        DoctorUsername: req.body.DoctorUsername,
        Date: req.body.Date,
        Availability : "Available"
      });
      res.status(200).send("Created successfully");
    }else{
      res.status(400).send("either patient or doctor is not found")
    }
    
};

const getAppointments = async (req, res) => {
  try {
    const {Date, DoctorUsername, Availability} = req.query;
    const filter = {};
    console.log(req.query.Date)
    if(Date){
      filter.Date = Date + "T11:30:00.000Z";
    }
    if(DoctorUsername){
      filter.DoctorUsername = DoctorUsername;
    }
    if(Availability){
      filter.Availability = Availability;
    }
    const Appointments = await Appointment.find(filter);
    res.status(200).send(Appointments);
  } catch (e) {
    res.status(400).send("Error could not get Appointments !!");
  }
};

const updateAppointment = async (req, res) => {
  await Appointment.updateOne({
    PatientUsername: req.body.PatientUsername,
    DoctorUsername: req.body.DoctorUsername
  },{
    $set:{Availability: req.body.Availability}
  })
  console.log("here")
  res.status(200).send("Updated!!");
};

const deleteAppointment = async (req, res) => {
  //delete a Doctor from the database
  try {
    await Appointment.deleteMany()
    res.status(200).send("deleted Appointment !!");
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
