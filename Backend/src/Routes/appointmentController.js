// #Task route solution
const Appointment = require("../Models/Appointment.js");
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const prescriptions = require("../Models/Prescriptions.js");
const { default: mongoose } = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw",
);

const createAppointment = async (req, res) => {
  try {
    const { DoctorUsername } = req.body;
    const filter = {};
    //console.log(req.body);
    if (DoctorUsername) {
      filter.Username = DoctorUsername;
    }
    //console.log(filter);
    const Doctor1 = await Doctor.findOne(filter);
    //console.log(Doctor1);
    const price = parseInt(Doctor1.Hourlyrate * 100 * 1.1);

    await stripe.products.create({
      name: Doctor1.Name,
      default_price_data: {
        currency: "egp",
        unit_amount: price,
      },
    });

    await Appointment.create({
      DoctorUsername: req.body.DoctorUsername,
      PatientUsername: "",
      NationalID: "",
      Date: req.body.Date,
      TimeH: req.body.TimeH,
      TimeM: req.body.TimeM,
      Availability: "Available",
      Status: "Upcoming",
    });
    // await Mango.create({
    //   variety: req.body.variety,
    // countryOfOrigin: req.body.countryOfOrigin,
    // });
    res.status(200).send("Created successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("either patient or doctor is not found");
  }
};

const createFollowUp = async (req, res) => {
  try {
    await Appointment.create({
      DoctorUsername: req.body.DoctorUsername,
      PatientUsername: req.body.PatientUsername,
      NationalID: "",
      Date: req.body.Date,
      TimeH: req.body.TimeH,
      TimeM: req.body.TimeM,
      Availability: "Reserved",
      Status: "Upcoming",
      Type: "Follow Up",
    });
    // await Mango.create({
    //   variety: req.body.variety,
    // countryOfOrigin: req.body.countryOfOrigin,
    // });
    res.status(200).send("Created successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("either patient or doctor is not found");
  }
};

const getAppointments = async (req, res) => {
  try {
    const { Speciality, Name } = req.query;
    const Date1 = req.query.Date;
    const filter = {};
    const filter2 = {};
    if (Date1) {
      filter.Date = Date1 + "T00:00:00.000Z";
    }
    if (Speciality) {
      filter2.Speciality = Speciality;
    }
    if (Name) {
      filter2.Name = Name;
    }
    filter.Availability = "Available";
    const Appointments = await Appointment.find(filter);
    const r = [];
    for (let i = 0; i < Appointments.length; ++i) {
      filter2.Username = Appointments[i].DoctorUsername;
      const tmp = await Doctor.findOne(filter2);
      if (tmp) {
        const t = {
          Doctor: tmp,
          Date: Appointments[i].Date,
          TimeH: Appointments[i].TimeH,
          TimeM: Appointments[i].TimeM,
        };

        if (Date.now() <= t.Date) {
          r.push(t);
        }
      }
    }
    res.status(200).send(r);
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not get Appointments !!");
  }
};

const updateAppointment = async (req, res) => {
  const doctorPatients = await Doctor.findOne({
    Username: req.body.DoctorUsername,
  });
  const patient = await Patient.findOne({ Username: req.body.PatientUsername });
  const Prescription = await prescriptions.findOne({
    Patient: req.body.PatientUsername,
    Doctor: req.body.DoctorUsername,
  });
  let result = doctorPatients.Patients;
  let hello = false;
  for (let index = 0; index < result.length; index++) {
    if (result[index].patient.Username == req.body.PatientUsername) {
      hello = true;
    }
  }
  if (!hello) {
    result.push({ patient: patient, prescriptions: Prescription });
  }
  await Doctor.updateOne(
    { Username: req.body.DoctorUsername },
    { $set: { Patients: result } },
  );
  await Appointment.updateOne(
    {
      DoctorUsername: req.body.DoctorUsername,
      Date: req.body.Date,
      TimeH: req.body.TimeH,
      TimeM: req.body.TimeM,
    },
    {
      $set: {
        Availability: req.body.Availability,
        PatientUsername: req.body.PatientUsername,
        NationalID: req.body.NationalID,
      },
    },
  );
  res.status(200).send("Updated!!");
};

const rescheduleAppointment = async (req, res) => {
  await Appointment.updateOne(
    {
      DoctorUsername: req.body.DoctorUsername,
      PatientUsername: req.body.PatientUsername,
      Date: req.body.Date + "T00:00:00.000Z",
      TimeH: req.body.TimeH,
      TimeM: req.body.TimeM,
    },
    {
      $set: {
        PatientUsername: "",
        NationalID: "",
        Availability: "Available",
        Status: "Upcoming", // You can update the status accordingly
      },
    }
  );

  res.status(200).send("Updated!!");
}

const updateAppointmentWallet = async (req, res) => {
  const doctorPatients = await Doctor.findOne({
    Username: req.body.DoctorUsername,
  });
  const discount = req.body.Discount;
  const patient = await Patient.findOne({ Username: req.body.PatientUsername });
  let wallet = patient.Wallet;
  let sessionPrice = doctorPatients.Hourlyrate * ((100 - discount) / 100);
  sessionPrice = sessionPrice * 1.1;
  let walletD = doctorPatients.Wallet;
  console.log("hi");
  if (wallet >= sessionPrice) {
    const Prescription = await prescriptions.findOne({
      Patient: req.body.PatientUsername,
      Doctor: req.body.DoctorUsername,
    });
    let result = doctorPatients.Patients;
    let hello = false;
    for (let index = 0; index < result.length; index++) {
      if (result[index].patient.Username == req.body.PatientUsername) {
        hello = true;
      }
    }
    if (!hello) {
      result.push({ patient: patient, prescriptions: Prescription });
    }
    await Patient.updateOne(
      { Username: req.body.PatientUsername },
      { $set: { Wallet: wallet - sessionPrice } },
    );
    console.log(wallet);
    await Doctor.updateOne(
      { Username: req.body.DoctorUsername },
      { $set: { Patients: result, Wallet: walletD + sessionPrice } },
    );
    console.log(walletD);
    await Appointment.updateOne(
      {
        DoctorUsername: req.body.DoctorUsername,
        Date: req.body.Date,
        TimeH: req.body.TimeH,
        TimeM: req.body.TimeM,
      },
      {
        $set: {
          Availability: req.body.Availability,
          PatientUsername: req.body.PatientUsername,
          NationalID: req.body.NationalID,
        },
      },
    );
    console.log("good");
    res.status(200).send("Updated!!");
  } else {
    console.log("bad");
    res.status(403).send("not enough money in wallet!");
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    await Appointment.updateOne(
      {
        DoctorUsername: req.body.DoctorUsername,
      },
      {
        $set: { Status: req.body.Status },
      },
    );
    console.log("here");
    res.status(200).send("Updated!!");
  } catch (e) {
    res.status(400).send("Not Updated!!");
  }
};

const filterDateAppointments = async (req, res) => {
  const { PatientUsername, DoctorUsername, Date } = req.query;
  //console.log(req.query);
  const filter = {};
  if (PatientUsername) {
    filter.PatientUsername = PatientUsername;
  }
  if (DoctorUsername) {
    filter.DoctorUsername = DoctorUsername;
  }
  if (Date) {
    filter.Date = Date + "T00:00:00.000Z";
  }
  //console.log(filter);
  const Appointments = await Appointment.find(filter);
  res.status(200).send(Appointments);
};

const filterStatusAppointments = async (req, res) => {
  const { PatientUsername, DoctorUsername, Status } = req.query;
  const filter = {};
  if (PatientUsername) {
    filter.PatientUsername = PatientUsername;
  }
  if (DoctorUsername) {
    filter.DoctorUsername = DoctorUsername;
  }
  if (Status) {
    filter.Status = Status;
  }
  const Appointments = await Appointment.find(filter);
  res.status(200).send(Appointments);
};

const deleteAppointment = async (req, res) => {
  //delete a Doctor from the database
  try {
    await Appointment.deleteMany();
    res.status(200).send("deleted Appointment !!");
  } catch (e) {
    res.status(400).send("Error could not delete Appointment !!");
  }
};

module.exports = {
  createAppointment,
  createFollowUp,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  filterDateAppointments,
  filterStatusAppointments,
  updateAppointmentWallet,
  rescheduleAppointment,
};
