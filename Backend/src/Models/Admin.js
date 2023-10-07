const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },

    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
     
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
