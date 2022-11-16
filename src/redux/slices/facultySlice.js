import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import facultyService from "../../services/facultyService";

export const getAllFacultyThunk = createAsyncThunk('faculty/getall', async () => {
    const response = await facultyService.getAllFaculty();
    return response;
});

export const facultySlice = createSlice ({
    name: 'faculty',
    initialState: {
        faculties: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllFacultyThunk.fulfilled, (state, action) => {
                state.faculties = action.payload.data.faculties;
            })
    }
});

export const { } = facultySlice.actions;

export default facultySlice.reducer;