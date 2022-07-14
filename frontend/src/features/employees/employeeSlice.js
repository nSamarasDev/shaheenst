import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from './employeeService';

const initialState = {
  employees: [],
  employee: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create employee
export const createEmployee = createAsyncThunk(
  'employee/create',
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.createEmployee(employeeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get employees
export const getEmployees = createAsyncThunk(
  'employees/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployees(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get employee
export const getEmployee = createAsyncThunk(
  'employees/get',
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployee(employeeId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// close employee
export const closeEmployee = createAsyncThunk(
  'employees/close',
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.closeEmployee(employeeId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  'employees/update',
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.updateEmployee(employeeId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.map((employee) =>
          employee._id === action.payload._id
            ? (employee.status = 'closed')
            : employee
        );
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
