const mongoose = require("mongoose");

// Schema for report
const ReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Patient"
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Doctor"
  },
  status: {
    type: "String",
    enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Report", ReportSchema);