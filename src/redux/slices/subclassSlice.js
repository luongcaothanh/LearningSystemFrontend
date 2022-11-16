import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subclassService from "../../services/subclassService";

export const getSubclassOfClassThunk = createAsyncThunk('subclass/class', async (arg) => {
    const { subjectID, semester } = arg;
    const response = await subclassService.getSubclassOfClass(subjectID, semester);
    return response;
});

export const subclassSlice = createSlice ({
    name: 'subclass',
    initialState: {
        subclasses: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSubclassOfClassThunk.fulfilled, (state, action) => {
                state.subclasses = action.payload.data.subclassOfClasses;
            })
    }
});

export const { } = subclassSlice.actions;

export default subclassSlice.reducer;