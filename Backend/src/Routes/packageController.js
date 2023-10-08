const Package = require("../Models/Package.js");
const { default: mongoose } = require("mongoose");

const createPackage = async (req, res) => {
    try{
        await Package.create({
            Name: req.body.Name,
            discountDoctor: req.body.discountDoctor,
            discountMedicin: req.body.discountMedicin,
            discountFamily: req.body.discountFamily,
            Price: req.body.Price,
        });
        res.status(200).send("Created successfully");
    }catch(e){
        res.status(400).send("Error could not create package !!");
    }
}

const getPackage = async (req, res) => {
    try{
        const packages = await Package.find();
        res.status(200).send({ data: packages});
    }catch(e){
        res.status(400).send("Error could not get package !!");
    }
}

const updatePackage = async (req, res) => {
    try{
        await Package.updateOne({
            Name: req.body.Name,
            discountDoctor: req.body.discountDoctor,
            discountMedicin: req.body.discountMedicin,
            discountFamily: req.body.discountFamily,
            Price: req.body.Price,
        });
        res.status(200).send("Updated Successfu");
    }catch(e){
        res.status(400).send("Error could not update package !!");
    }
}

const deletePackage = async (req, res) => {
    try{
        await Package.deleteOne({
            Name: req.body.Name,
        });
        res.status(200).send("Deleted Successfully");
    }catch(e){
        res.status(400).send("Error could not delete package !!");
    }
}

module.exports = { createPackage, getPackage, updatePackage, deletePackage };