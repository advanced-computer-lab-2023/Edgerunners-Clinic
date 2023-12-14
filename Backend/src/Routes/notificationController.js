const express = require("express");
const router = express.Router();
const Notification = require("../Models/Notification.js");
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");

// Assuming you have a route like '/createNotification'
const createNotification = async (req, res) =>  {
  try {
    const { patientUsername, doctorUsername, message } = req.body;

    // Check if either patientUsername or doctorUsername is provided
    if (!patientUsername && !doctorUsername) {
      return res.status(400).json({ error: "Please provide either Patient_Username or Doctor_Username." });
    }

    if (patientUsername) {
      // If Patient_Username is provided, create a notification for the patient
      const patient = await Patient.findOne({ Username: patientUsername });

      if (patient) {
        const doc = '';
        const rel = {
          Patient_Username: patientUsername,
          Doctor_Username: doc,
          Message: message,
        };
        await Notification.create(rel);
        return res.status(201).json({ message: "Notification created successfully." });
      }
    } else {
      // If Doctor_Username is provided, create a notification for the doctor
      const doctor = await Doctor.findOne({ Username: doctorUsername });

      if (doctor) {
        const doc = '';
       console.log(doctorUsername);
        const rel = {
          Patient_Username: doc,
          Doctor_Username: doctorUsername,
          Message: message,
        };
        console.log(rel);
        await Notification.create(rel);
      
        return res.status(201).json({ message: "Notification created successfully." });
      }
    }

    return res.status(404).json({ error: "Patient or doctor not found." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { patientUsername, doctorUsername } = req.body;
    let notifications;

    if (patientUsername) {
      const patient = await Patient.findOne({ Username: patientUsername });
      if (!patient) {
        return res.status(404).json({ error: "Patient not found." });
      }
      notifications = await Notification.find({ Patient_Username: patientUsername });
    } else if(doctorUsername) {
      const doctor = await Doctor.findOne({ Username: doctorUsername });
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found." });
      }
      notifications = await Notification.find({ Doctor_Username: doctorUsername });
    }
    else{
      notifications = await Notification.find();
    }
    return res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

  const deleteNotification = async (req, res) => {
    try {
      const { message } = req.query;
  
      // Check if the message is provided
      if (!message) {
        rres.status(400).send("Error message not provided");
      }
  
      // Find and delete the notification based on the message
      const deletedNotification = await Notification.findOneAndDelete({ Message: message });
  
      if (!deletedNotification) {
        res.status(400).send("Error notification not found");
      }
  
      return res.status(200).json({ message: "Notification deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(400).send("Error internal server error");
    }
  };

module.exports = {createNotification,getNotifications,deleteNotification};
