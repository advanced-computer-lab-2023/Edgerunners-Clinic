const LinkedAccounts = require("../Models/LinkedAccounts.js");
const { default: mongoose } = require("mongoose");
const Patient = require("../Models/Patient.js");


const createLinkedAccount = async (req, res) => {
  try {
    let { patientUsername, email, phonenum, relation } = req.body;

    const patientl = await Patient.findOne({
      $or: [{ Email: email }, { phoneNumber: phonenum }],
    });
    // Find the patient based on patientUsername
    //console.log(patientl);
    if (!patientl) {
      res.status(404).send("Patient not found");
      return;
    }

    if (!patientl.Linked) {
      if (relation === "Wife/Husband") {
        if (patientl.Gender === "Male") {
          relation = "Husband";
        } else {
          relation = "Wife";
        }
        
      }else{
        relation = "Child"
      }
      await LinkedAccounts.create({
        PatientUsername: patientUsername,
        Username: patientl.Username,
        Relation: relation,
      });
      const flag = true;
      await Patient.updateOne(
        { Username: patientl.Username },
        { $set: { Linked: flag } },
      );
      res.status(200).send("Linked account created successfully");
    } else {
      res.status(404).send("this is patient is already linked with another account");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getLinkedAccounts = async (req, res) => {
  try {
    const { patientUsername } = req.body;

    // Find linked accounts based on patientUsername
    const linkedAccounts = await LinkedAccounts.find({
      PatientUsername: patientUsername,
    });

    //console.log(linkedAccounts);
    if (linkedAccounts.length === 0) {
      res
        .status(404)
        .json("No linked accounts found for the specified patient");
      return;
    }

    res.status(200).json(linkedAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
module.exports = { createLinkedAccount, getLinkedAccounts };
