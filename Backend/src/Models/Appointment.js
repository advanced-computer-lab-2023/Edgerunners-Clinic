const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  Date: {
    type: Date,
    required: true,
  },
  TimeH: {
    type: String,
    required: true,
  },
  TimeM: {
    type: String,
    required: true,
  },
  PatientUsername: {
    type: String,
  },
  DoctorUsername: {
    type: String,
    required: true,
  },
  Availability: {
    type: String,
    enum: ["Available", "Reserved"],
    required: true,
  },
  Status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled", "Rescheduled"],
    required: true,
  },
  NationalID: {
    type: String,
    required: false,
  },
  Type: {
    type: String,
    default: "New Appointment",
    required: false,
  },
});

appointmentSchema.index(
  {
    DoctorUsername: 1,
    Date: 1,
    TimeH: 1,
    TimeM: 1,
  },
  {
    unique: true,
  },
);

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
// const mongoose = require('mongoose');

// const mangoSchema = new mongoose.Schema({
//   variety: {
//     type: String,
//     required: true,
//   },
//   countryOfOrigin: {
//     type: String,
//     required: true,
//   },
//   as: {
//     type: String
//   }
// });

// mangoSchema.index({
//   variety: 1,
//   countryOfOrigin: 1,
// }, {
//   unique: true,
// });

// module.exports = mongoose.model('Mango', mangoSchema);
