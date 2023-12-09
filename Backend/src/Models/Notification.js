const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema(
    {
        Doctor_Username: {
            type: String,
            required: false,
            unique: false,
          },
          Patient_Username: {
            type: String,
            required: false,
            unique: false,
          },
          Message:{
            type: String,
            required: false,
            unique: true,
          }
        },
          { timestamps: true },
        );
        
        const Notification = mongoose.model("notification", notificationSchema);
        module.exports = Notification;