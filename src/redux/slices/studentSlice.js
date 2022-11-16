import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../../services/studentService";

export const getAllStudentThunk = createAsyncThunk('student/getall', async () => {
    const response = await studentService.getAllStudent();
    return response;
});

export const getStudentOfFacultyThunk = createAsyncThunk('student/faculty', async (arg) => {
    const { facultyName } = arg;
    const response = await studentService.getStudentOfFaculty(facultyName);
    return response;
});

export const studentSlice = createSlice ({
    name: 'student',
    initialState: {
        students: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllStudentThunk.fulfilled, (state, action) => {
                state.students = action.payload.data.students;
            })
            .addCase(getStudentOfFacultyThunk.fulfilled, (state, action) => {
                state.students = action.payload.data.students;
            })
    }
});

export const { } = studentSlice.actions;

export default studentSlice.reducer;