const HealthPackage = require("../Models/HealthPackage.js");
const { default: mongoose } = require("mongoose");
const Patient = require("../Models/Patient.js");
const { getLinkedAccounts } = require("./linkedAccountsController.js");
const LinkedAccounts = require("../Models/LinkedAccounts.js");
const Package = require("../Models/Package.js");
const createHealthPackage = async (req, res) => {
    try {
        const { patientUsername, packagename } = req.body;
        const patient = await Patient.findOne({Username: patientUsername});
        console.log(patientUsername);
      
          if(!patient.HealthPackageflag){
            const subscriptionDate = new Date();
            const oneYearLater = new Date(subscriptionDate);
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            
            const formattedOneYearLater = `${oneYearLater.getFullYear()}-${String(
              oneYearLater.getMonth() + 1
            ).padStart(2, '0')}-${String(oneYearLater.getDate()).padStart(2, '0')}`;
            
            const statuss = `Subscribed until ${formattedOneYearLater}`;
            await HealthPackage.create({
                UserName: patientUsername,
                packageName : packagename,
                Status: statuss,
            });
           
            const flag=true;
            await Patient.findOneAndUpdate(
                { Username: patientUsername },
                { HealthPackageflag: flag },
                { new: true } // Return the modified document
              );
              res.status(200).send('Health package subscribed successfully');
          }
       
   else
    {   

        res.status(200).send('you are subscribing to one already')
    }

      } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
};
const getHealthPackages = async (req, res) => {
  try {
    const { patientUsername } = req.query;
    let healthPackages;

    if (patientUsername) {
      // Get health packages for a specific patient
      healthPackages = await HealthPackage.find({ UserName: patientUsername });
    } else {
      // Get all health packages
      healthPackages = await HealthPackage.find();
    }

    res.status(200).json(healthPackages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const viewStatusforMyself = async (req, res) => {
  const { patientUsername } = req.body;
  try {
    
    const healthPackages = await HealthPackage.findOne({ UserName: patientUsername });
    console.log(healthPackages);
    const packageDetails = await Package.findOne({ Name: healthPackages.packageName });
    if (packageDetails!=null){
    const ret={UserName: patientUsername,Status:healthPackages.Status,PackageName: packageDetails.Name,discountDoctor:packageDetails.discountDoctor,discountMedicin:packageDetails.discountMedicin,discountFamily:packageDetails.discountFamily, Price: packageDetails.Price};
      res.status(200).json(ret);}
      else {
        res.status(200).send('you are not subscribing to one ')
      }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const viewStatusForMyFamilyMember = async (req, res) => {
  try {
    const { patientUsername } = req.body;
    // Assuming getLinkedAccounts is a function that returns an array of linked account usernames
    const linkedAccounts = await LinkedAccounts.find({ PatientUsername: patientUsername});
    console.log(linkedAccounts);
if(linkedAccounts.length==0){
  res.status(200).send("There is not any Linked Accounts");
}
else{
    const healthPackageStatusArray = [];

    for (const  linkedAccount of linkedAccounts) {  
      const healthPackages = await HealthPackage.find({ UserName:  linkedAccount.Username});
      
console.log(healthPackages);
      if (healthPackages.length > 0) {
        console.log("i passed");
        // Assuming that a patient can have multiple health packages, you may need to iterate over the packages
        const statuss = healthPackages[0].Status;
        const packageDetails = await Package.findOne({ Name: healthPackages[0].packageName });
        healthPackageStatusArray.push({ username: linkedAccount.Username, Status:statuss, PackageName: packageDetails.Name,discountDoctor:packageDetails.discountDoctor,discountMedicin:packageDetails.discountMedicin,discountFamily:packageDetails.discountFamily, Price: packageDetails.Price});
      }
    }
    console.log(healthPackageStatusArray);

    res.status(200).json(healthPackageStatusArray);
  } }catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const Cancelsubscription =async (req, res) => {
  try{
    const { patientUsername } = req.body;
    const healthPackages = await HealthPackage.findOne({ UserName:patientUsername });
    if (healthPackages) {
      
      await HealthPackage.findOneAndUpdate(
        { UserName: patientUsername },
        { RenewalDate: false },
        { new: true } 
      );

      res.status(200).send('Subscription canceled successfully');
    } else {
      res.status(404).send('No health package found for the specified patient.');
    }
  }catch (error) {

  }
}
module.exports ={
  createHealthPackage ,
  getHealthPackages,
  viewStatusforMyself,
  viewStatusForMyFamilyMember,
  Cancelsubscription,
};