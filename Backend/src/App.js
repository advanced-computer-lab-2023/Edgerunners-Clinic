// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("./Routes/patientController");

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
} = require("./Routes/doctorController");

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

app.use(cors());
// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
// });

app.post("/addPatient", createPatient);
app.get("/getPatient", getPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);

app.post("/addDoctor", createDoctor);
app.get("/getDoctor", getDoctors);
app.put("/updateDoctor", updateDoctor);
app.delete("/deleteDoctor", deleteDoctor);

app.post("/addAdmin", createAdmin);
app.get("/getAdmin", getAdmins);
app.put("/updateAdmin", updateAdmin);
app.delete("/deleteAdmin", deleteAdmin);

/*
                                                    End of your code
*/