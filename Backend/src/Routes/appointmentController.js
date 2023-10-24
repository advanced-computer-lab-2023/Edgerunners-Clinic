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
  let isValid = true;
  const patient = await Patient.findOne({ Username: req.body.PatientUsername });
  const doctor = await Doctor.findOne({ Username: req.body.DoctorUsername });
  if (!patient || !doctor) {
    isValid = false;
  }
  if (isValid) {
    console.log(req.body.Date);
    await Appointment.create({
      PatientUsername: req.body.PatientUsername,
      DoctorUsername: req.body.DoctorUsername,
      Date: req.body.Date,
      Availability: "Available",
      Status: "Upcoming",
    });
    res.status(200).send("Created successfully");
  } else {
    res.status(400).send("either patient or doctor is not found");
  }
};

const getAppointments = async (req, res) => {
  try {
    const { Date, Speciality, Name } = req.query;
    const filter = {};
    const filter2 = {};
    if (Date) {
      filter.Date = Date + "T22:00:00.000Z";
    }
    if (Speciality) {
      filter2.Speciality = Speciality;
    }
    if (Name) {
      filter2.Name = Name;
    }
    filter.Availability = "Available";
    const Appointments = await Appointment.find(filter);
    const r = [];
    for (let i = 0; i < Appointments.length; ++i) {
      filter2.Username = Appointments[i].DoctorUsername;
      const tmp = await Doctor.findOne(filter2);
      if (tmp) {
        r.push(tmp);
      }
    }
    res.status(200).send(r);
  } catch (e) {
    res.status(400).send("Error could not get Appointments !!");
  }
};

const updateAppointment = async (req, res) => {
  await Appointment.updateOne(
    {
      DoctorUsername: req.body.DoctorUsername,
    },
    {
      $set: { Availability: req.body.Availability },
    },
  );
  console.log("here");
  res.status(200).send("Updated!!");
};

const updateAppointmentStatus = async (req, res) => {
  try{
    await Appointment.updateOne(
      {
        DoctorUsername: req.body.DoctorUsername,
      },
      {
        $set: { Status: req.body.Status },
      },
    );
    console.log("here");
    res.status(200).send("Updated!!");
  }catch(e){
    res.status(400).send("Not Updated!!");
  }
};

const filterDateAppointments = async (req, res) => {
  const {PatientUsername, DoctorUsername, Date} = req.query;
  const filter = {};
  if(PatientUsername){
    filter.PatientUsername = PatientUsername;
  }
  if(DoctorUsername){
    filter.DoctorUsername = DoctorUsername;
  }
  if(Date){
    filter.Date = Date+"T10:30:00.000Z";
  }
  const Appointments = await Appointment.find(filter);
  res.status(200).send(Appointments);
}

const filterStatusAppointments = async (req, res) => {
  const {PatientUsername, DoctorUsername, Status} = req.query;
  const filter = {};
  if(PatientUsername){
    filter.PatientUsername = PatientUsername;
  }
  if(DoctorUsername){
    filter.DoctorUsername = DoctorUsername;
  }
  if(Status){
    filter.Status = Status;
  }
  const Appointments = await Appointment.find(filter);
  res.status(200).send(Appointments);
}


const deleteAppointment = async (req, res) => {
  //delete a Doctor from the database
  try {
    await Appointment.deleteMany();
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
  updateAppointmentStatus,
  filterDateAppointments,
  filterStatusAppointments,
};
