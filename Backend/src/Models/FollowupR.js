const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowUpRequestSchema = new Schema(
  {
    PatientUsername: {
      type: String,
      required: true,
    },
    DoctorUsername: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    NationalID: {
      type: String,
      default: "",
    },
    Date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const FollowUpRequest = mongoose.model(
  "FollowUpRequests",
  FollowUpRequestSchema,
);
module.exports = FollowUpRequest;
