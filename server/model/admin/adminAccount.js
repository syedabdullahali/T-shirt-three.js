const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Admin schema with additional fields for contact and identification
const adminSchema = new Schema({
    name: { type: String,required: true, trim: true},
    email: { type: String, required: true,unique: true,trim: true},
    password: { type: String,required: true},
    otp: { type: String},
    bio: { type: String,trim: true,maxlength: [500, 'Bio cannot be more than 500 characters long']},
    profilePicture: { type: String, trim: true},
    role:{type:String,default:'vendor', enum: ['admin', 'vendor'],},
    status: { type: Boolean, default: true },
    lastLogin: {type: Date},
    createdAt: {type: Date,default: Date.now},
    updatedAt: { type: Date,default: Date.now},
    address: {
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City cannot be more than 100 characters long']
    },
    state: {
      type: String,
      trim: true,
      maxlength: [100, 'State cannot be more than 100 characters long']
    },
    country: {
      type: String,
      trim: true,
      maxlength: [100, 'Country cannot be more than 100 characters long']
    },
    postalCode: {
      type: String,
      trim: true,
      maxlength: [20, 'Postal code cannot be more than 20 characters long']
    }
  },
  mobileNumber: { type: String, required: true, trim: true},
  adharNumber: {type: String, required: true,trim: true},
  panCardNumber: {
    type: String,required: true,trim: true,
    match: [/^[A-Z]{5}\d{4}[A-Z]$/, 'PAN card number must be in the format ABCDE1234F'] // Example format
  },
  pinCodeNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'PIN code must be exactly 6 digits long'],
    maxlength: [6, 'PIN code must be exactly 6 digits long'],
    match: [/^\d+$/, 'PIN code must contain only digits']
  },
  isEmailVerify:{ type: Boolean, default: false }
});

// Middleware to update `updatedAt` field before saving
adminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create a model from the schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
