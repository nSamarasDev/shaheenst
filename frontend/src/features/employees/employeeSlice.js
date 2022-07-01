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
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
