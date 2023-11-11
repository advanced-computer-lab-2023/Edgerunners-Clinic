const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HealthPackageSchema = new Schema(
{
    UserName : {
    type: String,
    required:true,
},
    packageName:{
        type: String,
        required:true,
    },
    Status:{
        type: String,
        required:true,
    },
    RenewalDate:{
        type: Boolean,
        default:true,
    }
}
);
const HealthPackage = mongoose.model("HealthPackage", HealthPackageSchema);
module.exports = HealthPackage;