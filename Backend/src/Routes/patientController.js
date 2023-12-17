// #Task route solution
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const Relation = require("../Models/Relation.js");
const Admin = require("../Models/Admin.js");
const Appointment = require("../Models/Appointment.js");
const Pharmacist = require("../Models/Pharmacist.js");
var bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};
const fs = require("fs");
const path = require("path");

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  try {
    let PatientUsername = await Doctor.findOne({ Username: req.body.Username });
    const PatientMail = await Doctor.findOne({ Email: req.body.Email });
    const adminMail = await Admin.findOne({ Email: req.body.Email });
    if (!PatientUsername) {
      PatientUsername = await Admin.findOne({ Username: req.body.Username });
    }
    if (!PatientUsername && !PatientMail && !adminMail) {
      await Patient.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        FileNames: [],
        HealthRecords: [],
        DOB: req.body.DOB,
        Wallet: 0,
        EmergencyContact: {
          FullnameEC: req.body.EmergencyContact.FullnameEC,
          phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
        },
      });
      res.status(200).send("Created successfully");
    } else {
      if (PatientMail || adminMail) {
        res.status(401).send("e-mail already exists");
      } else {
        res.status(401).send("username already exists");
      }
    }
  } catch (e) {
    res.status(400).send("Failed To Create");
  }
};

const getPharmacists = async (req, res) => {
  try {
    const Pharmacists = await Pharmacist.find();
    res.status(200).send(Pharmacists);
  } catch (e) {
    res.status(400).send("Error could not get Pharmacists !!");
  }
};

const notifyOutOfStock = async (req, res) => {
  try {
    const users = await Pharmacist.find({ ReqStatus: "Accepted" });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(
      users.map(async (user) => {
        let notification = user.Notifications || [];
        notification.push(req.body.notifications);
        await Pharmacist.updateOne(
          { Username: user.Username },
          { $set: { Notifications: notification } },
        );
      }),
    );

    res.status(200).send("Updated successfully");
  } catch (error) {
    res.status(400).send("Error: Could not update Pharmacist!!");
  }
};

const patientUploadFile = async (req, res) => {
  const username = req.body.Username;
  //console.log(username);
  const filter = {};
  filter.Username = username;
  const patient = await Patient.findOne({ Username: username });
  //console.log(patient);
  const size = patient.FileNames.length + 1;
  const filename = username + "-" + size + ".pdf";
  const file = req.files.file;
  var filePath = "./uploadPatient/" + filename;
  file.mv(filePath);
  await Patient.updateOne(
    { Username: username },
    { $push: { FileNames: filename } },
  );
  res.status(200);
};

const deleteFile = async (req, res) => {
  const username = req.body.Username;
  const filter = {};
  filter.Username = username;
  const patient = await Patient.findOne({ Username: username });
  const filename = req.body.Filename;
  let files = patient.FileNames;
  let size = files.length;
  var filePath = "./uploadPatient/" + filename;

  let result = [];
  for (let i = 0; i < size; ++i) {
    const tmp = files.pop();
    console.log(tmp + " " + filename);
    if (tmp != filename) {
      result.unshift(tmp);
    }
  }
  await Patient.updateOne(
    { Username: username },
    { $set: { FileNames: result } },
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("File deleted:", filename);
  } else {
    console.log("File not found:", filename);
  }
  res.status(200).send("all good");
};

const patientUploadHealthRecord = async (req, res) => {
  const username = req.body.Username;
  //console.log(username);
  const filter = {};
  filter.Username = username;
  const patient = await Patient.findOne({ Username: username });
  //console.log(patient);
  const filename =
    username +
    "-healthrecord-" +
    Math.floor(Math.random() * 900000000) +
    100000000;
  +".pdf";
  const file = req.files.file;
  var filePath = "./healthrecords/" + filename;
  await Patient.updateOne(
    { Username: username },
    { $push: { HealthRecords: filename } },
  );
  file.mv(filePath);
  res.status(200);
};

const gethealthrecords = async (req, res) => {
  const username = req.params.Username;
  //console.log(username);
  const patient = await Patient.findOne({ Username: username });
  console.log(patient.FileNames);
  res.status(200).json(patient.FileNames);
};

const viewFiles = async (req, res) => {
  try {
    const filename = req.params.filename;
    // Read the contents of the uploadDirectory
    res.status(200).download("./uploadPatient/" + filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetWallet = async (req, res) => {
  const user = await Patient.findOne({ Username: req.params.username });
  const wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getPatients = async (req, res) => {
  try {
    const { Name } = req.query;
    const filter = {};
    if (Name) {
      filter.Name = Name;
    }

    const Patients = await Patient.find(filter);
    res.status(200).send(Patients);
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};
const getEmailp = async (req, res) => {
  const { Username } = req.query;
  try {
    const p = await Patient.findOne({ Username: Username });
    console.log(p.Email);
    console.log(p);
    res.status(200).send(p.Email);
  } catch (e) {
    res.status(400).send("Error could not get Doctors !!");
  }
};

const filterPatients = async (req, res) => {
  // try {
  const { Name, Username, up } = req.query;
  const filter = {};
  const filter2 = {};
  //console.log({ Name, Username, up });
  if (Name) {
    filter2.PatientUsername = Name;
  }
  if (Username) {
    filter.Username = Username;
    filter2.DoctorUsername = Username;
  }

  const doctor = await Doctor.findOne(filter);
  const patients = doctor.Patients;
  const r = [];
  const puser = [];
  for (let i = 0; i < patients.length; ++i) {
    if (!Name) {
      r.push(patients[i].patient);
      puser.push(patients[i].patient.Username);
    } else if (patients[i].patient.Name == Name) {
      r.push(patients[i].patient);
      puser.push(patients[i].patient.Username);
    }
  }
  const rr = [];
  let flag = false;
  for (let i = 0; i < puser.length; ++i) {
    filter2.PatientUsername = puser[i];
    const ap = await Appointment.find(filter2);
    //console.log(ap);
    //console.log(ap.length);

    for (let j = 0; j < ap.length; ++j) {
      if (!flag) {
        if (ap[j] && ap[j].Date >= Date.now()) {
          let flag2 = false;
          const patientName = await Patient.findOne({
            Username: ap[j].PatientUsername,
          });
          console.log(patientName);
          for (let k = 0; k < rr.length; ++k) {
            if (rr[k].Username === patientName.Username) {
              flag2 = true;
              break;
            }
            //flag = true;
          }
          if (!flag2) {
            rr.push(patientName);
          }
        }
      }
    }
  }

  if (up == "abdo") {
    res.status(200).send(rr);
  } else {
    res.status(200).send(r);
  }
  // } catch (e) {
  //   res.status(400).send("Error could not get Patients !!");
  // }
};

const updatePatient = async (req, res) => {
  const password = req.query.Password;
  const username = req.params.Username;
  await Patient.updateOne(
    { Username: username },
    { $set: { Password: password } },
  ).catch("an error happened");
  res.status(200).send("all good");
};

const updateCart = async (req, res) => {
  const username = req.body.username;
  const arr = req.body.arr;
  console.log(arr);
  await Patient.updateOne(
    { Username: username },
    {
      $set: {
        Cart: [],
      },
    },
  );
  for (let i = 0; i < arr.length; ++i) {
    await Patient.updateOne(
      { Username: username },
      {
        $push: {
          Cart: {
            medicineName: arr[i].medicinename,
            count: arr[i].count,
            price: arr[i].price,
            totalprice: arr[i].price,
          },
        },
      },
    ).catch("an error happened");
  }
  res.status(200).send("all good");
};

const ResetPass = async (req, res) => {
  const newPassword = req.body.Password;
  const email = req.body.Email;

  const doctor = await Doctor.findOne({ Email: email });
  if (doctor) {
    await Doctor.updateOne(
      { Email: email, Status: "Accepted" },
      { $set: { Password: await hashPassword(newPassword) } },
    ).catch("an error happened");
    res.status(200).send("all good");
    return;
  } else {
    let user = await Patient.findOne({ Email: email });
    if (user) {
      await Patient.updateOne(
        { Email: email },
        { $set: { Password: await hashPassword(newPassword) } },
      ).catch("An error happened");
      res.status(200).send("all good");
      return;
    } else {
      user = await Admin.findOne({ Email: email });
      if (user) {
        await Admin.updateOne(
          { Email: email },
          { $set: { Password: await hashPassword(newPassword) } },
        ).catch("An error happened");
        res.status(200).send("all good");
        return;
      } else {
        res.status(200).send("Email not found");
        return;
      }
    }
  }
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  try {
    if ((await Patient.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Patient.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete patient !!");
  }
};

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  if (isNaN(dob)) {
    throw new Error("Invalid date of birth");
  }
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const getCart = async (req, res) => {
  const user = await Patient.findOne({ Username: req.query.username });

  let cart = [];
  if (user.Cart) {
    cart = user.Cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
  }
  // console.log(user.Cart);
  res.status(200).send({ cart });
};
const incrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const orderPrice = req.body.price;
    const username = req.body.username;
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName,
    );

    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].count += 1;
      cart[existingMedicineIndex].totalprice += orderPrice;
    } else {
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Incremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not increment quantity");
  }
};

const decrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const orderPrice = req.body.price;
    const username = req.body.username; // Assuming you pass the username in the request
    const user = await Patient.findOne({ Username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName,
    );

    if (existingMedicineIndex !== -1) {
      // If the medicine is found in the cart
      if (cart[existingMedicineIndex].count > 1) {
        // If the count is greater than 1, decrement the quantity
        cart[existingMedicineIndex].count -= 1;
        cart[existingMedicineIndex].totalprice -= orderPrice;
      } else {
        // If the count is 1, remove the medicine from the cart
        cart.splice(existingMedicineIndex, 1);
      }
    } else {
      // If the medicine is not in the cart, you may want to handle this case
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not decrement quantity");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const username = req.body.username; // Assuming you pass the username in the request
    const user = await Patient.findOne({ Username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName,
    );

    if (existingMedicineIndex !== -1) {
      cart.splice(existingMedicineIndex, 1);
    } else {
      // If the medicine is not in the cart
      return res.status(404).send("Medicine not found in the cart");
    }
    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not remove medicine");
  }
};

const addOrder = async (req, res) => {
  try {
    const orderAddress = req.body.orderaddress;
    const paymentMethod = req.body.paymentmethod;
    const orderStatus = "Accepted";
    const username = req.body.username; // Replace with the actual username
    const user = await Patient.findOne({ Username: username });
    let wallet = user.Wallet;
    if (!user) {
      return res.status(404).send("User not found");
    }
    let order = user.Orders || [];
    let orderid = order.length;
    order.push({
      orderid,
      cartItems: [...user.Cart],
      orderAddress,
      paymentMethod,
      orderStatus,
    });
    let sales = user.Sales || [];
    let salesid = sales.length;
    for (let i = 0; i < user.Cart.length; i++) {
      salesid = sales.length;
      sales.push({
        salesid,
        medicineName: user.Cart[i].medicineName,
        quantity: user.Cart[i].count,
        price: user.Cart[i].totalprice,
        date: req.body.date,
        month: req.body.month,
        orderid,
      });
    }
    const totalpricepaid = user.Cart.reduce(
      (acc, item) => acc + item.totalprice,
      0,
    );
    if (wallet >= totalpricepaid) {
      wallet -= totalpricepaid;
    }
    user.Cart = [];
    await Patient.updateOne(
      { Username: username },
      { $set: { Orders: order, Sales: sales, Cart: [], Wallet: wallet } },
    );
    res.status(200).send("Added order successfully!");
  } catch (e) {
    res.status(400).send("Error could not add order !!");
  }
};

const getWalletPharmacy = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  // console.log(user);
  wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getAddress = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  //const address = user.Address;
  // console.log(user);
  let address = [];
  if (user.Address) {
    address = user.Address;
  }
  res.status(200).send(address);
};

const PaymentPrescriptionWallet = async (req, res) => {
  const patient = await Patient.findOne({ Username: req.body.username });
  let wallet = patient.Wallet;
  const price = req.body.price;
  const discount = req.body.discount;
  total = price * ((100 - discount) / 100);
  if (wallet >= total) {
    await Patient.updateOne(
      { Username: req.body.username },
      { $set: { Wallet: wallet - total } },
    );
    res.status(200).send("Payment Successful");
  } else {
    res.status(403).send("Insufficient Balance");
  }
};

module.exports = {
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
  getWalletPharmacy,
  addOrder,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCart,
  updateCart,
  getAddress,
  PaymentPrescriptionWallet,
  getEmailp,
  getPharmacists,
  notifyOutOfStock,
};
