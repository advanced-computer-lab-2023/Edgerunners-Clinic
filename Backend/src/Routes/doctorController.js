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
      Status: "Pending",
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Failed to Create Doctor");
  }
};

const getDoctors = async (req, res) => {
  try {
    const { Name, Education } = req.query;
    const filter = {};
    if (Name) {
      filter.Name = Name;
    }
    if (Education) {
      filter.Education = Education;
    }
    const Doctors = await Doctor.find(filter);
    res.status(200).send(Doctors);
  } catch (e) {
    res.status(400).send("Error could not get Doctors !!");
  }
};

// const getPrescriptions = async (req, res) => {
//   try {
//     const { Date, Doctor, Status } = req.query;
//     const filter = {};
//     filter.username = req.body.username;
//     if (Date) {
//       console.log("hi");
//       filter.Date = Date + "T22:00:00.000Z";
//     }
//     if (Doctor) {
//       filter.Doctor = Doctor;
//     }
//     if (Status) {
//       filter.Status = Status;
//     }
//     const Prescription = await prescriptions.find(filter);
//     res.status(200).send(Prescription);
//   } catch (e) {
//     res.status(400).send("Error could not get Patients !!");
//   }
// };

const updateDoctor = async (req, res) => {
  //update a Doctor in the database
  const user = req.body.Username;
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
const findDoctor = async (req, res) => {
  if ((await Doctor.findOne({ Username: req.body.Username }).length) === 0) {
    res.status(300).send("User Not Found");
  } else {
    const Doctors = await Doctor.findOne({ Username: req.body.Username });
    res.status(200).send({ data: Doctor });
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

module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  findDoctor,
};
