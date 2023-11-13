// #Task route solution
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const Relation = require("../Models/Relation.js");
const Admin = require("../Models/Admin.js");
const Appointment = require("../Models/Appointment.js");
var bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};
const fs = require("fs");
const path = require("path");

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  try {
    let PatientUsername = await Doctor.findOne({ Username: req.body.Username });
    const PatientMail = await Doctor.findOne({ Email: req.body.Email });
    const adminMail = await Admin.findOne({ Email: req.body.Email });
    if (!PatientUsername) {
      PatientUsername = await Admin.findOne({ Username: req.body.Username });
    }
    if (!PatientUsername && !PatientMail && !adminMail) {
      await Patient.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        FileNames: [],
        HealthRecords: [],
        DOB: req.body.DOB,
        Wallet: 0,
        EmergencyContact: {
          FullnameEC: req.body.EmergencyContact.FullnameEC,
          phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
        },
      });
      res.status(200).send("Created successfully");
    } else {
      if (PatientMail || adminMail) {
        res.status(401).send("e-mail already exists");
      } else {
        res.status(401).send("username already exists");
      }
    }
  } catch (e) {
    res.status(400).send("Failed To Create");
  }
};

const patientUploadFile = async (req, res) => {
  const username = req.body.Username;
  console.log(username);
  const filter = {};
  filter.Username = username;
  const patient = await Patient.findOne({ Username: username });
  console.log(patient);
  const size = patient.FileNames.length + 1;
  const filename = username + "-" + size + ".pdf";
  const file = req.files.file;
  var filePath = "./uploadPatient/" + filename;
  file.mv(filePath);
  await Patient.updateOne(
    { Username: username },
    { $push: { FileNames: filename } },
  );
  res.status(200);
};

const patientUploadHealthRecord = async (req, res) => {
  const username = req.body.Username;
  console.log(username);
  const filter = {};
  filter.Username = username;
  const patient = await Patient.findOne({ Username: username });
  console.log(patient);
  const filename =
    username +
    "-healthrecord-" +
    Math.floor(Math.random() * 900000000) +
    100000000;
  +".pdf";
  const file = req.files.file;
  var filePath = "./healthrecords/" + filename;
  await Patient.updateOne(
    { Username: username },
    { $push: { HealthRecords: filename } },
  );
  file.mv(filePath);
  res.status(200);
};

const gethealthrecords = async (req, res) => {
  const username = req.params.Username;
  console.log(username);
  const patient = await Patient.find({ Username: username }).select(
    "FileNames",
  );
  res.status(200).json(patient);
};

const viewFiles = async (req, res) => {
  try {
    const filename = req.params.filename;
    // Read the contents of the uploadDirectory
    res.status(200).download("./uploadPatient/" + filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetWallet = async (req, res) => {
  const user = await Patient.findOne({ Username: req.params.username });
  const wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getPatients = async (req, res) => {
  try {
    const { Name } = req.query;
    const filter = {};
    if (Name) {
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
    if (Name) {
      filter2.PatientUsername = Name;
    }
    if (Username) {
      filter.Username = Username;
      filter2.DoctorUsername = Username;
    }

    const doctor = await Doctor.findOne(filter);
    const patients = doctor.Patients;
    const r = [];
    const puser = [];
    for (let i = 0; i < patients.length; ++i) {
      if (!Name) {
        r.push(patients[i].patient);
        puser.push(patients[i].patient.Username);
      } else if (patients[i].patient.Name == Name) {
        r.push(patients[i].patient);
        puser.push(patients[i].patient.Username);
      }
    }

    const rr = [];
    for (let i = 0; i < puser.length; ++i) {
      filter2.PatientUsername = puser[i];
      const ap = await Appointment.findOne(filter2);
      if (ap && ap.Date >= Date.now()) {
        rr.push(ap);
      }
    }

    if (up == "abdo") {
      res.status(200).send(rr);
    } else {
      res.status(200).send(r);
    }
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};

const updatePatient = async (req, res) => {
  const password = req.query.Password;
  const username = req.params.Username;
  await Patient.updateOne(
    { Username: username },
    { $set: { Password: password } },
  ).catch("an error happened");
  res.status(200).send("all good");
};

const ResetPass = async (req, res) => {
  const newPassword = req.body.Password;
  const email = req.body.Email;

  const doctor = await Doctor.findOne({ Email: req.params.Email });
  if (doctor) {
    await Doctor.updateOne(
      { Email: email, Status: "Accepted" },
      { $set: { Password: await hashPassword(newPassword) } },
    ).catch("an error happened");
    res.status(200).send("all good");
  } else {
    let user = await Patient.findOne({ Email: req.params.Email });
    if (user) {
      await Patient.updateOne(
        { Email: email },
        { $set: { Password: await hashPassword(newPassword) } }
      ).catch("An error happened");
    } else {
      user = await Admin.findOne({ Email: req.params.Email });
      if (user) {
        await Admin.updateOne(
          { Email: email },
          { $set: { Password: await hashPassword(newPassword) } }
        ).catch("An error happened");
      } else {
        res.status(404).send("Email not found");
      }
    }
  }
  res.status(200).send("all good");
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

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  if (isNaN(dob)) {
    throw new Error("Invalid date of birth");
  }
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

module.exports = {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  filterPatients,
  patientUploadFile,
  viewFiles,
  gethealthrecords,
  patientUploadHealthRecord,
  ResetPass,
  GetWallet,
};
