const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
    {
      Name: {
        type: String,
        required: true,
        unique: true,
      },

      discountDoctor:{
        type: Number,
        required: true,
      },

      discountMedicin:{
        type: Number,
        required: true,
      },

      discountFamily:{
        type: Number,
        required: true,
      },

      Price: {
        type: Number,
        required: true,
      }
    },
    { timestamps: true }
  );

const Package = mongoose.model("package", packageSchema);
module.exports = Package;