const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//defining the schema
const DoctorSchema=new mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Encrypt password
DoctorSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
});

// Sign JWT and return
DoctorSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, 'secret', {
      expiresIn: '120m'
    });
  };
  
  // Match user password to hashed password in database
DoctorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports= Doctor;