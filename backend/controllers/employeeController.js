const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Employee = require('../models/EmployeeModel');

// @dec    Get all Employees
// @route  GET /api/employee
//@access  Private
const getEmployees = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employees = await Employee.find({ user: req.user.id });

  res.status(200).json(employees);
});

// @dec    Create new Employee
// @route  POST /api/employee
//@access  Private
const createEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    socialSecurityNumber,
    driversLicenseNumber,
    licenseExpireDate,
    phoneNumber,
    address,
  } = req.body;

  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !email ||
    !socialSecurityNumber ||
    !driversLicenseNumber ||
    !licenseExpireDate ||
    !phoneNumber ||
    !address
  ) {
    res.status(400);
    throw new Error('Please add employee information');
  }

  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.create({
    firstName,
    middleName,
    lastName,
    email,
    socialSecurityNumber,
    driversLicenseNumber,
    licenseExpireDate,
    phoneNumber,
    address,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(employee);
});

// @dec    Get spcific employee by id
// @route  GET /api/employees/:id
//@access  Private
const getEmployee = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(employee);
});

// @dec    Delete spcific employee by id
// @route  DELETE /api/employees/:id
//@access  Private
const deleteEmployee = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await employee.remove();

  res.status(200).json({ success: true });
});

// @dec    Update spcific employee by id
// @route  PUT /api/employees/:id
//@access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedEmployee);
});

module.exports = {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
