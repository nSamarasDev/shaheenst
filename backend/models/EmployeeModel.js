const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const EmployeeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    middleName: {
      type: String,
      required: [true, 'Please add a middle name or type none'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'employeed'],
      default: 'new',
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    socialSecurityNumber: {
      type: Number,
      required: [true, 'Please add a social security number'],
      maxlength: [9, 'No more than 9 digits'],
    },
    driversLicenseNumber: {
      type: Number,
      required: [true, 'Please add a drivers license number'],
      maxlength: [8, 'No more than 8 digits'],
    },
    licenseExpireDate: {
      type: Date,
      required: [true, 'Please add a license expiration date'],
    },
    phoneNumber: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Geocode & create location field
EmployeeSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    trye: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;

  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);
