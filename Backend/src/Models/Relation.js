const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationSchema = new Schema(
  {
    PatientUsername:{
      type: String,
      required: true,
    },
    NationalID: {
      type: Number,
      required: true,
      unique: true,
    },

    Name: {
      type: String,
      required: true,
    },

    Age: {
      type: Date,
      required: true,
    },

    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    Relation: {
      type: String,
      enum: ["Wife", "Husband","Child"],
      required: true,
    },
  },
  { timestamps: true }
);

const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;
