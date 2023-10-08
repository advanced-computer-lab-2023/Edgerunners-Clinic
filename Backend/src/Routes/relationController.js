// #Task route solution
const Patient = require("../Models/Patient.js");
const Relation = require("../Models/Relation.js");
const { default: mongoose } = require("mongoose");

const createRelation = async (req, res) => {
  //add a new Relation to the database with
  //Name, Email and Age
  try {
    const rel = {
      Patient: req.body.Patient,
      NationalID: req.body.NationalID,
      Gender: req.body.Gender,
      Name: req.body.Name,
      Age: req.body.Age,
      Relation: req.body.Relation,
    };
    await Relation.create(rel);

    await Patient.updateOne(
      { Username: req.body.Patient },
      { $push: { Relations: rel } }
    );
    res.status(200).send("added successfully");
  }catch(e){
    res.status(400).send("Failed to add Relation");
  }
  
  
};

const getRelation = async (req, res) => {
  try{
    const user = await Patient.findOne({Username : req.query.Username});
    
    const rel = user.Relations;
    res.status(200).send({ data: rel });
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
    if(await Relation.find({Patient: req.body.Patient,NationalID: req.body.NationalID}).length == 0){
      res.status(300).send("User Not Found");
    }else{
      await Relation.deleteOne({Patient: req.body.Patient,NationalID: req.body.NationalID})
      await Patient.updateOne(
        { Username: req.body.Patient },
        { $pull: { Relations: { NationalID : req.body.NationalID} } }
      );
      res.status(200).send("Deleted successfully");
    }
  }catch(e){
    res.status(400).send("Error could not delete Relation !!");
  }
  
};

module.exports = { createRelation, getRelation, updateRelation, deleteRelation };
