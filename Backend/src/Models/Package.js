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
        type: String,
        required: true,
      },

      discountMedicin:{
        type: String,
        required: true,
      },

      discountFamily:{
        type: String,
        required: true,
      },

      Price: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );

const Package = mongoose.model("package", packageSchema);
module.exports = Package;