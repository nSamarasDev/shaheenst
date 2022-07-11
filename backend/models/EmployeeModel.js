const mongoose = require('mongoose');

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
      enum: ['new', 'closed', 'current'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
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
      type: String,
      required: [true, 'Please add a social security number'],
      maxlength: [9, 'No more than 9 digits'],
      match: [
        /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/,
        'Please add a valid social security number format',
      ],
    },
    driversLicenseNumber: {
      type: String,
      required: [true, 'Please add a drivers license number'],
      maxlength: [20, 'No more than 20 charactors'],
    },
    licenseExpireDate: {
      type: String,
      maxlength: [20, 'Please add a license State and expiration date'],
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

module.exports = mongoose.model('Employee', EmployeeSchema);
