import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../../services/employeeService";

export const getAllEmpThunk = createAsyncThunk('employee/getall', async () => {
    const response = await employeeService.getAllEmployee();
    return response;
});

export const employeeSlice = createSlice ({
    name: 'employee',
    initialState: {
        employees: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllEmpThunk.fulfilled, (state, action) => {
                state.employees = action.payload.data.employees;
            })
    }
});

export const { } = employeeSlice.actions;

export default employeeSlice.reducer;