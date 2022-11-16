import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lecturerService from "../../services/lecturerService";

export const getAllLecturerThunk = createAsyncThunk('lecturer/getall', async () => {
    const response = await lecturerService.getAllLecturer();
    return response;
});

export const getLecturerOfFacultyThunk = createAsyncThunk('lecturer/faculty', async (arg) => {
    const { facultyName } = arg;
    const response = await lecturerService.getLecturerOfFaculty(facultyName);
    return response;
});

export const lecturerSlice = createSlice ({
    name: 'lecturer',
    initialState: {
        lecturers: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllLecturerThunk.fulfilled, (state, action) => {
                state.lecturers = action.payload.data.lecturers;
            })
            .addCase(getLecturerOfFacultyThunk.fulfilled, (state, action) => {
                state.lecturers = action.payload.data.lecturers;
            })
    }
});

export const { } = lecturerSlice.actions;

export default lecturerSlice.reducer;