const Doctor = require("../../../models/doctor");


//Resister a Doctor
module.exports.register = async (req, res) => {
  try {
    //create Doctor
    let doctor = await Doctor.create(req.body);
    // Return response
    res.status(201).json({
      success: true,
      body: doctor,
      msg:'Doctor Registered Sucessfully!'
    });
    
  } catch (err) {
    console.log(err);
    // Error handling
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//Doctor Login
module.exports.login= async (req, res)=>{
  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        msg:'No email or password'
      });
    }

    let doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

    // Check if password matches
    const isMatch = await doctor.matchPassword(password);
    // Error handling if invalid password
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

    // Get JWT token
    const token = doctor.getSignedJwtToken();

    // Return response
    res.status(200).json({
      success: true,
      token,
      msg: `Log In Sucessful! Keep the Token safe ${doctor.name}!`
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
}