const Report = require("../../../models/report");

//Find all reports with same status
exports.status = async (req, res) => {
  try {
      //console.log(req.params.status);
    if(
        req.params.status!="Negative" &&
        req.params.status!="Travelled-Quarantine" &&
        req.params.status!="Symptoms-Quarantine" &&
        req.params.status!="Positive-Admit" 
    ){
        return res.status(400).json({
            success: false,
            msg:'Incorrect Status!',
            Available_Statuses:'Negative, Travelled-Quarantine, Symptoms-Quarantine Positive-Admit'
        });
    }
    const reports = await Report.find({ status: req.params.status })
      .populate("patient")
      .populate("doctor");

    // Creating object to send back to the user
    let result = {};
    // No of cases that have this status
    result.caseCount = reports.length;
    let ans = [];
    // Fetching doctor name and patient details
    for (let i = 0; i < reports.length; i++) {
      let patient = {};
      patient.name = reports[i].patient.name;
      patient.phone = reports[i].patient.phone;
      ans.push({
        doctor: reports[i].doctor.name,
        patient: patient
      });
    }
    result.report = ans;

    // Return response
    return res.status(200).json({
      success: true,
      body: result,
      msg:'All reports with the status!'
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};