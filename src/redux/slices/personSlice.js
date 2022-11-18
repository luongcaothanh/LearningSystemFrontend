import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../../services/studentService";
import employeeService from "../../services/employeeService";
import lecturerService from "../../services/lecturerService";
import personService from "../../services/personService";

export const getStudentInfoThunk = createAsyncThunk('student/info', async (arg, thunkAPI) => {
    const { personID, } = arg;
    const response = await studentService.getStudentInfo(personID);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(getPersonPhoneThunk(arg));
    }
    return response;
});

export const getAAOInfoThunk = createAsyncThunk('aao/info', async (arg, thunkAPI) => {
    const { personID } = arg;
    const response = await employeeService.getAAOInfo(personID);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(getPersonPhoneThunk(arg));
    }
    return response;
});

export const getManagerInfoThunk = createAsyncThunk('manager/info', async (arg, thunkAPI) => {
    const { personID } = arg;
    const response = await employeeService.getManagerInfo(personID);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(getPersonPhoneThunk(arg));
    }
    return response;
});

export const getLecturerInfoThunk = createAsyncThunk('lecturer/info', async (arg, thunkAPI) => {
    const { personID } = arg;
    const response = await lecturerService.getLecturerInfo(personID);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(getPersonPhoneThunk(arg));
    }
    return response;
});

export const getPersonPhoneThunk = createAsyncThunk('person/phone', async (arg) => {
    const { personID } = arg;
    const response = await personService.getPersonPhone(personID);
    return response;
});

export const getStudentStatusThunk = createAsyncThunk('student/status', async (arg) => {
    const { studentID } = arg;
    const response = await studentService.getStudentStatus(studentID);
    return response;
});


export const personSlice = createSlice ({
    name: 'person',
    initialState: {
        person: null,
        phone: null,
        studentStatus: null
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
            .addCase(getPersonPhoneThunk.fulfilled, (state, action) => {
                state.phone = action.payload.data.phoneNumber;
            })
            .addCase(getStudentStatusThunk.fulfilled, (state, action) => {
                state.studentStatus = action.payload.data.statusOfStudent;
            })
    }
});

export const { } = personSlice.actions;

export default personSlice.reducer;