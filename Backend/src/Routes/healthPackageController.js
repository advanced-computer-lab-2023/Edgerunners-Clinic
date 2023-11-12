const HealthPackage = require("../Models/HealthPackage.js");
const { default: mongoose } = require("mongoose");
const Patient = require("../Models/Patient.js");
const { getLinkedAccounts } = require("./linkedAccountsController.js");
const LinkedAccounts = require("../Models/LinkedAccounts.js");
const Package = require("../Models/Package.js");
const createHealthPackage = async (req, res) => {
  try {
    const { patientUsername, packagename } = req.body;
    const patient = await Patient.findOne({ Username: patientUsername });
    const package = await Package.findOne({ Name: packagename });

    if (!patient.HealthPackageflag) {
      const subscriptionDate = new Date();
      const oneYearLater = new Date(subscriptionDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      const formattedOneYearLater = `${oneYearLater.getFullYear()}-${String(
        oneYearLater.getMonth() + 1,
      ).padStart(2, "0")}-${String(oneYearLater.getDate()).padStart(2, "0")}`;

      const statuss = `Subscribed until ${formattedOneYearLater}`;
      await HealthPackage.create({
        Username: patientUsername,
        packageName: packagename,
        Status: statuss,
        EndDate: oneYearLater,
        renewal: true,
        discountDoctor: package.discountDoctor,
        discountMedicin: package.discountMedicin,
        discountFamily: package.discountFamily,
      });
      await Patient.findOneAndUpdate(
        { Username: patientUsername },
        { HealthPackageflag: true },
        { new: true }, // Return the modified document
      );
      res.status(200).send("Health package subscribed successfully");
    } else {
      res.status(400).send("you are subscribed to one already");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const getHealthPackages = async (req, res) => {
  try {
    const { patientUsername } = req.query;
    let healthPackages;

    if (patientUsername) {
      // Get health packages for a specific patient
      healthPackages = await HealthPackage.find({ Username: patientUsername });
    } else {
      // Get all health packages
      healthPackages = await HealthPackage.find();
    }

    res.status(200).json(healthPackages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const viewStatusforMyself = async (req, res) => {
  const { patientUsername } = req.query;
  try {
    const healthPackages = await HealthPackage.findOne({
      Username: patientUsername,
    });
    console.log(req.query);

    if (healthPackages != null) {
      const ret = {
        Username: patientUsername,
        Status: healthPackages.Status,
        EndDate: healthPackages.EndDate,
        PackageName: healthPackages.packageName,
        discountDoctor: healthPackages.discountDoctor,
        discountMedicin: healthPackages.discountMedicin,
        discountFamily: healthPackages.discountFamily,
        Renewal: healthPackages.Renewal,
      };
      res.status(200).json(ret);
    } else {
      res.status(400).send("Not subscribed to a Package");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const viewStatusForMyFamilyMember = async (req, res) => {
  try {
    const { patientUsername } = req.query;
    // Assuming getLinkedAccounts is a function that returns an array of linked account usernames
    const linkedAccounts = await LinkedAccounts.find({
      PatientUsername: patientUsername,
    });

    if (linkedAccounts.length !== 0) {
      const healthPackageStatusArray = [];

      for (const linkedAccount of linkedAccounts) {
        const healthPackages = await HealthPackage.findOne({
          Username: linkedAccount.Username,
        });
        healthPackageStatusArray.push({
          username: linkedAccount.Username,
          Status: healthPackages.Status,
          EndDate: healthPackages.EndDate,
          PackageName: healthPackages.packageName,
          discountDoctor: healthPackages.discountDoctor,
          discountMedicin: healthPackages.discountMedicin,
          discountFamily: healthPackages.discountFamily,
          Renewal: healthPackages.Renewal,
        });
      }

      res.status(200).json(healthPackageStatusArray);
    }else{
      res.status(400).send("No Family Members Wa7ed");

    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const Cancelsubscription = async (req, res) => {
  try {
    const { patientUsername } = req.body;
    const healthPackages = await HealthPackage.findOne({
      Username: patientUsername,
    });
    if (healthPackages) {
      await HealthPackage.findOneAndUpdate(
        { Username: patientUsername },
        { Renewal: false },
        { new: true },
      );

      res.status(200).send("Subscription canceled successfully");
    }
  } catch (error) {}
};
module.exports = {
  createHealthPackage,
  getHealthPackages,
  viewStatusforMyself,
  viewStatusForMyFamilyMember,
  Cancelsubscription,
};
