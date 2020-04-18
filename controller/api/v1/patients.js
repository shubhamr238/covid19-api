const Patient = require("../../../models/patient");
const Report = require("../../../models/report");

//Register a patient
exports.registerPatient = async (req, res) => {
  try {
    const { name, phone } = req.body;
    let patient;
    patient = await Patient.find({
      phone
    });
    if (patient.length > 0) {
      return res.status(200).json({
        success: true,
        body: patient[0]
      });
    }
    patient = await Patient.create({
      name,
      phone
    });
    // Return response
    return res.status(201).json({
      success: true,
      body: patient,
      msg:'Patient Registered Sucessfully!'
    });
  } catch (err) {
    // Error handling
    return res.status(401).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//create patient report
module.exports.createReport = async (req, res) => {
  try {
    const { status } = req.body;
    const patient = req.params.id;
    const doctor = req.doctor.id;
    const patientDetails = await Patient.findById(patient);
    const report = await Report.create({
      patient,
      doctor,
      status
    });
    // Add the report details in patient db
    patientDetails.reports.push(report);
    patientDetails.save();

    // Return response
    return res.status(201).json({
      success: true,
      body: report,
      msg:'Report Created Sucessfully!'
    });
  } catch (error) {
    console.log(error);
    // Error handling
    return res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//Fetch All Patient Report
module.exports.allReports = async (req, res) => {
  try {
    const reports = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor" }
    });

    // Creating object to send back to the user
    let ans = {};
    ans.patient_name = reports.name;
    ans.phone = reports.phone;
    ans.reports = [];
    for (let i = 0; i < reports.reports.length; i++) {
      ans.reports.push({
        doctor: reports.reports[i].doctor.name,
        status: reports.reports[i].status
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      body: ans,
      msg:'All reports of the patient!'
    });
  } catch (error) {
    return res.status(400).json({
      success: false
    });
  }
};

