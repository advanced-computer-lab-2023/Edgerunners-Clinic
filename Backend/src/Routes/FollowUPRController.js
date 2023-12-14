const Doctor = require("../Models/Doctor.js");
const Patient = require("../Models/Patient.js");
const FollowUpRequest = require("../Models/FollowupR.js");

const CreateRequest = async (req, res) => {
  const DoctorUsername = req.body.DoctorUsername;
  const PatientUsername = req.body.PatientUsername;
  const NationalID = req.body.NationalID;
  const Date = req.body.Date;
  const TimeM = req.body.TimeM;
  console.log(PatientUsername);
  const TimeH = req.body.TimeH;
  await FollowUpRequest.create({
    DoctorUsername: DoctorUsername,
    PatientUsername: PatientUsername,
    NationalID: NationalID,
    Date: Date,
    TimeH: TimeH,
    TimeM: TimeM,
  });
  res.status(200).send("Request Created Successfully!");
};

const GetAllRequest = async (req, res) => {
  const Requests = await FollowUpRequest.find();
  res.status(200).json(Requests);
};

const DeleteAllRequests = async (req, res) => {
  await FollowUpRequest.deleteMany();
  res.status(200).send("Deleted all requests");
};

module.exports = { CreateRequest, DeleteAllRequests, GetAllRequest };
