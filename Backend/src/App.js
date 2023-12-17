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
  deleteFile,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getWalletPharmacy,
  addOrder,
  updateCart,
  getCart,
  getAddress,
  PaymentPrescriptionWallet,
  getEmailp,
  getPharmacists,
  notifyOutOfStock,
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
  viewFilesDoctor,
  getEmail,
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
  removemedicine,
} = require("./Routes/prescriptionController");

const {
  createAppointment,
  createFollowUp,
  getAppointments,
  getAppointmentFilter,
  updateAppointment,
  deleteAppointment,
  filterDateAppointments,
  filterStatusAppointments,
  updateAppointmentStatus,
  updateAppointmentWallet,
  rescheduleAppointment,
  cancelAppointment,
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
  getDiscount,
  getDiscountSession,
  PaymentPackageWallet,
} = require("./Routes/healthPackageController");
const {
  createNotification,
  getNotifications,
  deleteNotification,
} = require("./Routes/notificationController");

const MongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://Test1:Test1@cluster0.xo5a1to.mongodb.net/?retryWrites=true&w=majority";

//App variables
const app = express();
const port = process.env.PORT || 3005;
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
const {
  protectA,
  protectD,
  protectP,
  signin,
  changePassword,
} = require("./Models/auth");

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

app.get("/create-coupon", async (req, res) => {
  //console.log(req.query);
  if (req.query.coupon !== "0") {
    console.log("hereeee");
    const coupon = await stripe.coupons.create({
      percent_off: req.query.coupon,
      duration: "repeating",
      duration_in_months: 12,
    });
    res.status(200).send(coupon.id);
  } else {
    res.status(200).send(null);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const products = await stripe.products.list({
    active: true,
    limit: 1000,
  });
  //console.log(products.data);
  console.log(req.body);
  const product = products.data.find((p) => p.name === req.body.name);
  let applyDiscount = false;
  //console.log(req.body.coupon);
  if (req.body.coupon !== "") {
    applyDiscount = true;
  }
  console.log(products.data);
  const sessionData = {
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
  };
  console.log(applyDiscount);

  if (applyDiscount) {
    sessionData.discounts = [
      {
        coupon: req.body.coupon,
      },
    ];
  }
  const session = await stripe.checkout.sessions.create(sessionData);
  //console.log(session);
  res.send({ url: session.url });
});

const {
  createMedicine,
  getMedicines,
  updateMedicine,
  archiveMedicine,
  unarchiveMedicine,
  findMedicine,
  updateQuantity,
  reverseQuantity,
} = require("./Routes/medicineController");
const {
  CreateRequest,
  DeleteAllRequests,
  GetAllRequest,
  GetMyRequests,
  handleReject,
  handleAccept,
} = require("./Routes/FollowUPRController.js");

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body;

    console.log("Got payload: " + payload);

    response.status(200).end();
  },
);
// const {testStripe} = require("./stripe.js")
// app.post("/stripe", testStripe);
// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
// });
app.put("/changePassword", changePassword);

app.post("/signin", signin);
app.post("/addPatient", createPatient);
app.post("/patientUploadFile", patientUploadFile);
app.get("/viewFiles/:filename", viewFiles);
app.get("/viewFilesDoctor/:filename", viewFilesDoctor);

app.get("/getWallet/:username", GetWallet);
app.get("/getWalletD/:username", GetWalletD);
app.get("/patientUploadHealthRecord", patientUploadHealthRecord);
app.get("/gethealthrecords/:Username", gethealthrecords);
app.get("/getPatient", getPatients);
app.get("/getEmailp",getEmailp)
app.get("/filterPatient", filterPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);
app.put("/deleteFile", deleteFile);
app.get("/getAddress", getAddress);
app.put("/incrementQuantity", incrementQuantity);
app.put("/removeFromCart", removeFromCart);
app.get("/getcart", getCart);
app.put('/decrementQuantity', decrementQuantity);
app.get('/getAddress', getAddress);
app.put("/addOrder", addOrder);
app.get("/getWalletPharmacy", getWalletPharmacy);
app.put("/PaymentPrescriptionWallet", PaymentPrescriptionWallet);



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
app.get("/getEmail", getEmail);

app.put("/updateCart", updateCart);
app.get("/getPharmacist", getPharmacists);
app.put("/notifyOutOfStock", notifyOutOfStock);

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
app.put("/removemedicine", removemedicine);

app.post("/createAppointment", createAppointment);
app.post("/createFollowUp", createFollowUp);
app.get("/getAppointment", getAppointments);
app.get("/getAppointmentFilter", getAppointmentFilter);
app.get("/filterDateAppointments", filterDateAppointments);
app.get("/filterStatusAppointments", filterStatusAppointments);
app.put("/updateAppointment", updateAppointment);
app.put("/updateAppointmentWallet", updateAppointmentWallet);
app.put("/rescheduleAppointment", rescheduleAppointment);
app.put("/cancelAppointment", cancelAppointment);
app.delete("/deleteAppointment", deleteAppointment);


app.post("/createLinkedAccount", createLinkedAccount);
app.get("/getLinkedAccounts", getLinkedAccounts);

app.post("/createHealthPackage", createHealthPackage);
app.get("/getHealthPackages", getHealthPackages);
app.get("/viewStatusforMyself", viewStatusforMyself);
app.get("/viewStatusForMyFamilyMember", viewStatusForMyFamilyMember);
app.put("/Cancelsubscription", Cancelsubscription);
app.get("/getDiscount", getDiscount);
app.get("/getDiscountSession", getDiscountSession);
app.put("/PaymentPackageWallet", PaymentPackageWallet);

app.post("/createNotification", createNotification);
app.get("/getNotification", getNotifications);
app.delete("/deleteNotification", deleteNotification);

app.post("/addMedicine", createMedicine);
app.get("/getMedicine", getMedicines);
app.put("/updateMedicine", updateMedicine);
app.put("/archiveMedicine", archiveMedicine);
app.put("/unarchiveMedicine", unarchiveMedicine);
app.put("/updateQuantity", updateQuantity);
app.put("/reverseQuantity", reverseQuantity);

app.post("/createFURP", CreateRequest);
app.delete("/deleteAllRequests", DeleteAllRequests);
app.get("/getAllRequests", GetAllRequest);
app.get("/getMyRequests", GetMyRequests);
app.delete("/deleteRequest", handleReject);
app.put("/acceptRequest", handleAccept);
