const Appointment = require("../Models/Appointment.js");
const FollowUpRequest = require("../Models/FollowupR.js");

const CreateRequest = async (req, res) => {
  const DoctorUsername = req.body.DoctorUsername;
  const PatientUsername = req.body.PatientUsername;
  const NationalID = req.body.NationalID;
  const Date = req.body.Date;
  const TimeM = req.body.TimeM;
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

const GetMyRequests = async (req, res) => {
  const Username = req.query.Username;
  const data = await FollowUpRequest.find({ DoctorUsername: Username });
  res.status(200).json(data);
};

const handleAccept = async (req, res) => {
  const DoctorUsername = req.body.DoctorUsername;
  const PatientUsername = req.body.PatientUsername;
  const NationalID = req.body.NationalID;
  const Date = req.body.Date;
  const TimeM = req.body.TimeM;
  const TimeH = req.body.TimeH;
  console.log(DoctorUsername);
  console.log(PatientUsername);
  console.log(NationalID);
  console.log(Date);
  console.log(TimeM);
  console.log(TimeH);
  await FollowUpRequest.deleteOne({
    DoctorUsername: DoctorUsername,
    PatientUsername: PatientUsername,
    NationalID: NationalID,
    Date: Date,
    TimeH: TimeH,
    TimeM: TimeM,
  });
  await Appointment.updateOne(
    {
      DoctorUsername: DoctorUsername,
      Date: Date,
      TimeH: TimeH,
      TimeM: TimeM,
    },
    {
      $set: {
        PatientUsername: PatientUsername,
        NationalID: NationalID,
        Availability: "Reserved",
        Status: "Upcoming",
        Type: "Follow Up",
      },
    },
  );
  res.status(200).send("Accepted successfully!");
};

const handleReject = async (req, res) => {
  const DoctorUsername = req.query.DoctorUsername;
  const PatientUsername = req.query.PatientUsername;
  const NationalID = req.query.NationalID;
  const Date = req.query.Date;
  const TimeM = req.query.TimeM;
  const TimeH = req.query.TimeH;
  console.log(DoctorUsername);
  console.log(PatientUsername);
  console.log(NationalID);
  console.log(Date);
  console.log(TimeM);
  console.log(TimeH);
  await FollowUpRequest.deleteOne({
    DoctorUsername: DoctorUsername,
    PatientUsername: PatientUsername,
    NationalID: NationalID,
    Date: Date,
    TimeH: TimeH,
    TimeM: TimeM,
  });
  res.status(200).send("rejected successfully!");
};

const GetAllRequest = async (req, res) => {
  const Requests = await FollowUpRequest.find();
  res.status(200).json(Requests);
};

const DeleteAllRequests = async (req, res) => {
  await FollowUpRequest.deleteMany();
  res.status(200).send("Deleted all requests");
};

module.exports = {
  CreateRequest,
  GetMyRequests,
  DeleteAllRequests,
  GetAllRequest,
  handleReject,
  handleAccept,
};
