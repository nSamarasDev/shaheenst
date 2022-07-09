const express = require('express');
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employeeController');

const { protect } = require('../middleware/authMiddleware');

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:employeeId/notes', noteRouter);

router.route('/').get(protect, getEmployees).post(protect, createEmployee);

router
  .route('/:id')
  .get(protect, getEmployee)
  .delete(protect, deleteEmployee)
  .put(protect, updateEmployee);

module.exports = router;
