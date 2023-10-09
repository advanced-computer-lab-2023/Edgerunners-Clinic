const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    PatientUsername: {
      type: String,
      required: true,
    },

    DoctorUsername: {
      type: String,
      required: true,
    },
    Date:{
      type: Date,
      required: true,
      unique: true
    },
    EndDate:{
      type: Date,
    },
    Availability:{
      type: String,
      enum: ["Available", "Reserved"],
      required: true,
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
