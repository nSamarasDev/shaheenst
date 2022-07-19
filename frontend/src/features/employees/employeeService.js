import axios from 'axios';

const API_URL = '/api/employees/';

// Create employee
const createEmployee = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, employeeData, config);

  return response.data;
};

// Get all employees
const getEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get employee
const getEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + employeeId, config);

  return response.data;
};

// close employee
const closeEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + employeeId,
    { status: 'closed' },
    config
  );

  return response.data;
};

// update employee
const updateEmployee = async (formData, employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + employeeId,
    { ...formData },
    config
  );

  return response.data;
};

const employeeService = {
  createEmployee,
  getEmployees,
  getEmployee,
  closeEmployee,
  updateEmployee,
};

export default employeeService;
