const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HealthPackageSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Renewal: {
    type: Boolean,
    default: true,
  },
  discountDoctor: {
    type: String,
    required: true,
  },
  discountMedicin: {
    type: String,
    required: true,
  },
  discountFamily: {
    type: String,
    required: true,
  },
});
const HealthPackage = mongoose.model("HealthPackage", HealthPackageSchema);
module.exports = HealthPackage;
