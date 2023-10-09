const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    PatientUsername: {
      type: String,
      required: true,
      unique: true,
    },

    DoctorUsername: {
      type: String,
      required: true,
    },
    Date:{
      type: Date,
      required: true,
    },
    EndDate:{
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
