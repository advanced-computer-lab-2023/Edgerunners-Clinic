const Package = require("../Models/Package.js");
const { default: mongoose } = require("mongoose");
const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw')

const createPackage = async (req, res) => {
  try {
    await Package.create({
      Name: req.body.Name,
      discountDoctor: req.body.discountDoctor,
      discountMedicin: req.body.discountMedicin,
      discountFamily: req.body.discountFamily,
      Price: req.body.Price,
    });
    const price = parseInt(req.body.Price * 100);
    await stripe.products.create({
      name: req.body.Name,
      default_price_data:{
        currency: 'egp',
        unit_amount: price
      }
    })
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create package !!");
  }
};

const getPackage = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).send({ data: packages });
  } catch (e) {
    res.status(400).send("Error could not get package !!");
  }
};

const updatePackage = async (req, res) => {
  try {
    await Package.updateOne(
      {
        Name: req.body.Name,
      },
      { $set:{
        Name : req.body.NewName,
        Price: req.body.Price,
        discountDoctor: req.body.discountDoctor,
        discountMedicin: req.body.discountMedicin,
        discountFamily: req.body.discountFamily,
      }},
    );
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update package !!");
  }
};

const deletePackage = async (req, res) => {
  try {
    await Package.deleteOne({
      Name: req.body.Name,
    });
    res.status(200).send("Deleted Successfully");
  } catch (e) {
    res.status(400).send("Error could not delete package !!");
  }
};

module.exports = { createPackage, getPackage, updatePackage, deletePackage };
