import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../../services/studentService";
import employeeService from "../../services/employeeService";
import lecturerService from "../../services/lecturerService";

export const getStudentInfoThunk = createAsyncThunk('student/info', async (arg) => {
    const { personID, } = arg;
    const response = await studentService.getStudentInfo(personID);
    return response;
});

export const getAAOInfoThunk = createAsyncThunk('aao/info', async (arg) => {
    const { personID } = arg;
    const response = await employeeService.getAAOInfo(personID);
    return response;
});

export const getManagerInfoThunk = createAsyncThunk('manager/info', async (arg) => {
    const { personID } = arg;
    const response = await employeeService.getManagerInfo(personID);
    return response;
});

export const getLecturerInfoThunk = createAsyncThunk('lecturer/info', async (arg) => {
    const { personID } = arg;
    const response = await lecturerService.getLecturerInfo(personID);
    return response;
});


export const personSlice = createSlice ({
    name: 'person',
    initialState: {
        person: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getStudentInfoThunk.fulfilled, (state, action) => {
                state.person = action.payload.data.student;
            })
            .addCase(getAAOInfoThunk.fulfilled, (state, action) => {
                state.person = action.payload.data.aaoEmployee;
            })
            .addCase(getManagerInfoThunk.fulfilled, (state, action) => {
                state.person = action.payload.data.managerEmployee;
            })
            .addCase(getLecturerInfoThunk.fulfilled, (state, action) => {
                state.person = action.payload.data.lecturer;
            })
    }
});

export const { } = personSlice.actions;

export default personSlice.reducer;