import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import classService from "../../services/classService";

export const getClassOfSubjectThunk = createAsyncThunk('class/subject', async (arg) => {
    const { subjectID } = arg;
    const response = await classService.getClassOfSubject(subjectID);
    return response;
});

export const classSlice = createSlice ({
    name: 'class',
    initialState: {
        classes: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getClassOfSubjectThunk.fulfilled, (state, action) => {
                state.classes = action.payload.data.classes;
            })
    }
});

export const { } = classSlice.actions;

export default classSlice.reducer;