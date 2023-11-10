// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var fileUpload = require("express-fileupload");
mongoose.set("strictQuery", false);
require("dotenv").config();
const {
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
} = require("./Routes/patientController");

const {
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
} = require("./Routes/packageController");

const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("./Routes/adminController");

const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  findDoctor,
  addPatient4doctor,
  doctorUploadFile,
} = require("./Routes/doctorController");

const {
  createRelation,
  getRelation,
  updateRelation,
  deleteRelation,
} = require("./Routes/relationController");

const {
  createPrescriptions,
  getPrescriptions,
  updatePrescriptions,
  deletePrescriptions,
} = require("./Routes/prescriptionController");

const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  filterDateAppointments,
  filterStatusAppointments,
  updateAppointmentStatus,
} = require("./Routes/appointmentController");

const MongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://Test1:Test1@cluster0.xo5a1to.mongodb.net/?retryWrites=true&w=majority";

//App variables
const app = express();
const port = process.env.PORT || 3001;
const Patient = require("./Models/Patient.js");
// #Importing the patientController

// configurations
// Mongo DB

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// #Routing to PatientController here

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const { protectA, protectD, protectP, signin } = require("./Models/auth");

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    defCharset: "utf8",
    defParamCharset: "utf8",
  }),
);

// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
// });

app.post("/signin", signin);
app.post("/addPatient", createPatient);
app.post("/patientUploadFile", patientUploadFile);
app.get("/viewFiles/:filename",viewFiles);
app.get("/patientUploadHealthRecord",patientUploadHealthRecord);
app.get("/gethealthrecords/:Username",gethealthrecords);
app.get("/getPatient", getPatients);
app.get("/filterPatient", filterPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);
app.put("/ResetPass", ResetPass);

app.post("/addDoctor", createDoctor);
app.get("/getDoctor", getDoctors);
app.put("/updateDoctor", updateDoctor);
app.put("/addPatient4Doctor", addPatient4doctor);
app.delete("/deleteDoctor", deleteDoctor);
app.get("/findDoctor", findDoctor);
app.post("/doctorUploadFile", doctorUploadFile);

app.post("/addAdmin", createAdmin);
app.get("/getAdmin", getAdmins);
app.put("/updateAdmin", updateAdmin);
app.delete("/deleteAdmin", deleteAdmin);

app.post("/createPackage", createPackage);
app.get("/getPackage", getPackage);
app.put("/updatePackage", updatePackage);
app.delete("/deletePackage", deletePackage);

app.post("/createRelation", createRelation);
app.get("/getRelation", getRelation);
app.put("/updateRelation", updateRelation);
app.delete("/deleteRelation", deleteRelation);

app.post("/createPrescriptions", createPrescriptions);
app.get("/getPrescriptions", getPrescriptions);
app.put("/updatePrescriptions", updatePrescriptions);
app.delete("/deletePrescriptions", deletePrescriptions);

app.post("/createAppointment", createAppointment);
app.get("/getAppointment", getAppointments);
app.get("/filterDateAppointments", filterDateAppointments);
app.get("/filterStatusAppointments", filterStatusAppointments);
app.put("/updateAppointment", updateAppointment);
app.delete("/deleteAppointment", deleteAppointment);

