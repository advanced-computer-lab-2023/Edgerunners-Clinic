const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkedAccountsSchema = new Schema(
   {  PatientUsername:{ //al patient al 3aml link
        type: String,
        required: true,
      },
      Username:{ // username al m3molo link
        type: String,
        required: true,
      },
      Relation: {
        type: String,
        enum: ["Wife", "Husband", "Child"],
        required: true,
      },
    }
);
const LinkedAccounts = mongoose.model("LinkedAccounts", LinkedAccountsSchema);
module.exports = LinkedAccounts;