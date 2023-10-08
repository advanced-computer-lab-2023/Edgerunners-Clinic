// #Task route solution
const Relation = require("../Models/Relation.js");
const { default: mongoose } = require("mongoose");

const createRelation = async (req, res) => {
  //add a new Relation to the database with
  //Name, Email and Age
  try {
    await Relation.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Gender: req.body.Gender,
      Name: req.body.Name,
      Email: req.body.Email,
      phoneNumber: req.body.phoneNumber,
      DOB: req.body.DOB,
      EmergencyContact: {
        FullnameEC: req.body.Fullnameec,
        phoneNumberEC: req.body.phoneNumberec,
      },
      
    });
    res.status(200).send("added successfully");
  }catch(e){
    res.status(400).send("Failed to add Relation");
  }
  
  
};

const getRelation = async (req, res) => {
  try{
    const Relation = await Relation.find();
    res.status(200).send({ data: Relation });
  }catch(e){
    res.status(400).send("Error could not get Relations !!");
  }
  
};

const updateRelation = async (req, res) => {
  //update a Relation in the database
};

const deleteRelation = async (req, res) => {
  //delete a Relation from the database
  try{
    if(await Relation.find({Username: req.body.Username}).length == 0){
      res.status(300).send("User Not Found");
    }else{
      await Relation.deleteOne({Username: req.body.Username})
      res.status(200).send("Deleted successfully");
    }
  }catch(e){
    res.status(400).send("Error could not delete Relation !!");
  }
  
};

module.exports = { createRelation, getRelation, updateRelation, deleteRelation };
