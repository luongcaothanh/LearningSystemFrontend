import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subclassService from "../../services/subclassService";

export const getSubclassOfClassThunk = createAsyncThunk('subclass/class', async (arg) => {
    const { subjectID, semester } = arg;
    const response = await subclassService.getSubclassOfClass(subjectID, semester);
    return response;
});

export const getStudentOfSubclassThunk = createAsyncThunk('subclass/student', async (arg) => {
    const { subclassID, semester, subjectID } = arg;
    const response = await subclassService.getStudentOfSubclass(subclassID, semester, subjectID);
    return response;
});

export const subclassSlice = createSlice ({
    name: 'subclass',
    initialState: {
        subclasses: null,
        students: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSubclassOfClassThunk.fulfilled, (state, action) => {
                state.subclasses = action.payload.data.subclassOfClasses;
            })
            .addCase(getStudentOfSubclassThunk.fulfilled, (state, action) => {
                state.students = action.payload.data.students;
            })
    }
});

export const { } = subclassSlice.actions;

export default subclassSlice.reducer;