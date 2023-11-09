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
  ResetPass,
  linkPatients,
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

const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw')
// const storeItems = new Map([
//   [1,{priceInCents: 10000, name:"Silver Package"}],
//   [2,{priceInCents: 20000, name:"Gold Package"}],
// ])
// app.post('/create-checkout-session', (req, res) =>{
//   res.json({url:'Hi'})
// })
// app.get('/getProductList', async (req, res) => {
//   const products = await stripe.products.list({
//   });
//   res.data = {products : products};
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: 'T-shirt',
  //         },
  //         unit_amount: 2000,
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: 'http://localhost:5173/Success',
  //   cancel_url: 'http://localhost:5173/Cancel',
  // });

  // res.redirect(303, session.url);
// });


app.post("/create-checkout-session", async (req, res) =>{
  const products = await stripe.products.list({
    active: true,
  });
  //console.log(products.data);
  let price = null;
  for(let i =0; i< products.data.length ; i++ ){
    //console.log(products.data[i]);
    console.log(products.data[i]);
    if(products.data[i].name === req.body.name.name ){
      price = products.data[i].default_price; 
      break;
    }
  }
  // const {amount} = req.body;
    //console.log(amount);
    // const price = parseInt(amount.amount.Price * 100);
    // const product = await stripe.products.create({
    //   name: amount.amount.Name,
    //   default_price_data:{
    //     currency: 'egp',
    //     unit_amount: price
    //   }
    // })
    // const final = await stripe.prices.create({
    //   unit_amount: price,
    //   currency : 'egp',
    //   product: product.id
    // })
    //console.log(final)
    console.log(price);
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode: "payment",
      line_items:[{
        price :price,
        quantity: 1,
    }],
      success_url: 'http://localhost:5173/Success',
      cancel_url: 'http://localhost:5173/Cancel',
    });
    res.send({url: session.url})
  
})





// const {testStripe} = require("./stripe.js")
// app.post("/stripe", testStripe);
// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
// });



app.post("/signin", signin);
app.post("/addPatient", createPatient);
app.post("/patientUploadFile", patientUploadFile);
app.get("/getPatient", getPatients);
app.get("/filterPatient", filterPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);
app.put("/ResetPass", ResetPass);
app.post("/linkPatients", linkPatients);
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
