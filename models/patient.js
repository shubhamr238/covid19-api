const mongoose = require("mongoose");

// Schema for patient
const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  reports: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Report"
    }
  ]
});

module.exports = mongoose.model("Patient", PatientSchema);
