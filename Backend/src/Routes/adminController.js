// #Task route solution
const Admin = require("../Models/Admin.js");
const { default: mongoose } = require("mongoose");

const createAdmin = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age

  await Admin.create({
    Username: req.body.Username,
    Password: req.body.Password,
   Role:'Admin',
  });
  res.status(200).send("Created successfully");
};

const getAdmins = async (req, res) => {
  const Admins = await Admin.find();
  res.status(200).send({ data: Admins });
};

const updateAdmin = async (req, res) => {
  //update a Doctor in the database
};

const deleteAdmin = async (req, res) => {
  //delete a Doctor from the database
  await Admin.deleteMany();
  res.status(200).send("Deleted successfully");
};

module.exports = { createAdmin, getAdmins, updateAdmin, deleteAdmin };
