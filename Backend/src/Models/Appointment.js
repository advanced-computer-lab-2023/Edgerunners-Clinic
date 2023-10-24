const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    Date: {
      type: Date,
      required: true,
      unique: true,
    },
    PatientUsername: {
      type: String,
      required: true,
    },
    DoctorUsername: {
      type: String,
      required: true,
    },
    EndDate: {
      type: Date,
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
  },
  { timestamps: true },
);

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
