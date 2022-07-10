const asyncHandler = require('express-async-handler');

const Note = require('../models/notesModel');
const User = require('../models/userModel');
const Employee = require('../models/EmployeeModel');

// @dec    Get notes for an Employee
// @route  GET /api/employees/:employeeId/notes
//@access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.findById(req.params.employeeId);

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ employee: req.params.employeeId });

  res.status(200).json(notes);
});

// @dec    Create employee note
// @route  POST /api/employees/:employeeId/notes
//@access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using id in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const employee = await Employee.findById(req.params.employeeId);

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.employeeId,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
