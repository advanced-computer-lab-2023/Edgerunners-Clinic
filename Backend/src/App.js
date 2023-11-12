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
  GetWallet,
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
  getPatientNames,
  updateStatus,
  GetWalletD,
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
  createFollowUp,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  filterDateAppointments,
  filterStatusAppointments,
  updateAppointmentStatus,
  updateAppointmentWallet,
} = require("./Routes/appointmentController");

const {
  createLinkedAccount,
  getLinkedAccounts,
} = require("./Routes/linkedAccountsController");
const {
  createHealthPackage,
  getHealthPackages,
  viewStatusforMyself,
  viewStatusForMyFamilyMember,
  Cancelsubscription,
} = require("./Routes/healthPackageController");
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

const stripe = require("stripe")(
  "sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw",
);

app.post("/create-checkout-session", async (req, res) => {
  const products = await stripe.products.list({
    active: true,
  });
  //console.log(products.data);
  const product = products.data.find((p) => p.name === req.body.name);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: product.default_price,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:5173/Success?Name=${req.body.name}&PaymentType=${req.body.PaymentType}`,
    cancel_url: `http://localhost:5173/Cancel?PaymentType=${req.body.PaymentType}`,
  });
  //console.log(session);
  res.send({ url: session.url });
});
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const payload = request.body;

  console.log("Got payload: " + payload);

  response.status(200).end();
});
// const {testStripe} = require("./stripe.js")
// app.post("/stripe", testStripe);
// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
// });

app.post("/signin", signin);
app.post("/addPatient", createPatient);
app.post("/patientUploadFile", patientUploadFile);
app.get("/viewFiles/:filename", viewFiles);
app.get("/getWallet/:username", GetWallet);
app.get("/getWalletD/:username", GetWalletD);
app.get("/patientUploadHealthRecord", patientUploadHealthRecord);
app.get("/gethealthrecords/:Username", gethealthrecords);
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
app.get("/PatientsName/:Username", getPatientNames);
app.put("/updateStatus", updateStatus);

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
app.post("/createFollowUp", createFollowUp);
app.get("/getAppointment", getAppointments);
app.get("/filterDateAppointments", filterDateAppointments);
app.get("/filterStatusAppointments", filterStatusAppointments);
app.put("/updateAppointment", updateAppointment);
app.put("/updateAppointmentWallet", updateAppointmentWallet);
app.delete("/deleteAppointment", deleteAppointment);

app.post("/createLinkedAccount", createLinkedAccount);
app.get("/getLinkedAccounts", getLinkedAccounts);

app.post("/createHealthPackage", createHealthPackage);
app.get("/getHealthPackages", getHealthPackages);
app.get("/viewStatusforMyself", viewStatusforMyself);
app.get("/viewStatusForMyFamilyMember", viewStatusForMyFamilyMember);
app.put("/Cancelsubscription", Cancelsubscription);
