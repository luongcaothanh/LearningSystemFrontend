import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subjectService from "../../services/subjectService";

export const getAllSubjectThunk = createAsyncThunk('subject/getall', async () => {
    const response = await subjectService.getAllSubject();
    return response;
});

export const getSubjectOfFacultyThunk = createAsyncThunk('subject/faculty', async (arg) => {
    const { facultyName } = arg;
    const response = await subjectService.getSubjectOfFaculty(facultyName);
    return response;
});

export const subjectSlice = createSlice ({
    name: 'subject',
    initialState: {
        subjects: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllSubjectThunk.fulfilled, (state, action) => {
                state.subjects = action.payload.data.subjects;
            })
            .addCase(getSubjectOfFacultyThunk.fulfilled, (state, action) => {
                state.subjects = action.payload.data.subjects;
            })
    }
});

export const { } = subjectSlice.actions;

export default subjectSlice.reducer;