const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  status:{type:Boolean,default:false},
  createdAt:{ type: Date, default: Date.now },
  isEmailVerify:{type:Boolean,default:false},
  otp:String
});

const userModel = mongoose.model("user-account", userSchema);
module.exports = userModel;
