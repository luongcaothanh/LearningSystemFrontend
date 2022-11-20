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

export const getSubclassOfStudentThunk = createAsyncThunk('subclass/of/student', async (arg) => {
    const { studentID } = arg;
    const response = await subclassService.getSubclassOfStudent(studentID);
    return response;
});

export const getSubclassOfLecturerThunk = createAsyncThunk('subclass/of/lecturer', async (arg) => {
    const { lecturerID } = arg;
    const response = await subclassService.getSubclassOfLecturer(lecturerID);
    return response;
});

export const getSubclassOfSubjectThunk = createAsyncThunk('subclass/of/subject', async (arg) => {
    const { subjectID } = arg;
    const response = await subclassService.getSubclassOfSubject(subjectID);
    return response;
});

export const searchSubclassOfSubjectThunk = createAsyncThunk('subclass/subject/search', async (arg) => {
    const { keyword } = arg;
    const response = await subclassService.searchSubclassOfSubject(keyword);
    return response;
});

export const subclassSlice = createSlice ({
    name: 'subclass',
    initialState: {
        subclasses: null,
        students: null,
        subclassOfStudent: null,
        subclassOfLecturer: null,
        subclassSearch: null
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
            .addCase(getSubclassOfStudentThunk.fulfilled, (state, action) => {
                state.subclassOfStudent = action.payload.data.subclassesOfStudent;
            })
            .addCase(getSubclassOfLecturerThunk.fulfilled, (state, action) => {
                state.subclassOfLecturer = action.payload.data.subclassesOfLecturer;
            })
            .addCase(getSubclassOfSubjectThunk.fulfilled, (state, action) => {
                state.subclasses = action.payload.data.subclassesOfSubject;
            })
            .addCase(searchSubclassOfSubjectThunk.fulfilled, (state, action) => {
                state.subclassSearch = action.payload.data.subclasses;
            })
    }
});

export const { } = subclassSlice.actions;

export default subclassSlice.reducer;