const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perscriptionsSchema = new Schema(
  {
    Patient: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      enum: ["Filled", "Unfilled"],
    },

    Doctor: {
      type: String,
      required: true,
    },

    Date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const perscriptions = mongoose.model("perscriptions", perscriptionsSchema);
module.exports = perscriptions;
