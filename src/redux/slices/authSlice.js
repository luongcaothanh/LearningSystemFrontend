import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import personService from "../../services/personService";
import studentService from "../../services/studentService";
import subclassService from "../../services/subclassService";

export const loginThunk = createAsyncThunk('auth/login', async (arg, thunkAPI) => {
    const { username, password } = arg;
    const response = await authService.login(username, password);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(loadUserThunk());
    }
    return response;
});

export const loadUserThunk = createAsyncThunk('auth/loaduser', async (arg, thunkAPI) => {
    const response = await authService.getCurrentUser();
    if (response.errorCode === 0) {
        const personID = response.data.info.idCard;
        const arg2 = { personID };
        thunkAPI.dispatch(getCurrentPersonPhoneThunk(arg2));

        // get student status & subclass
        const roleName = response.data.info.roleName;
        if (roleName.includes("ROLE_STUDENT")) {
            const studentID = response.data.info.studentID;
            const arg3 = { studentID };
            thunkAPI.dispatch(getAuthStudentStatusThunk(arg3));
            thunkAPI.dispatch(getAuthSubclassOfStudentThunk(arg3));
        }

        if (roleName.includes("ROLE_LECTURER")) {
            const lecturerID = response.data.info.employeeID;
            const arg4 = { lecturerID };
            thunkAPI.dispatch(getAuthSubclassOfLecturerThunk(arg4));
        }
    }
    return response;
});

export const getCurrentPersonPhoneThunk = createAsyncThunk('auth/phone', async (arg) => {
    const { personID } = arg;
    const response = await personService.getPersonPhone(personID);
    return response;
});

export const getAuthStudentStatusThunk = createAsyncThunk('auth/student/status', async (arg) => {
    const { studentID } = arg;
    const response = await studentService.getStudentStatus(studentID);
    return response;
});

export const getAuthSubclassOfStudentThunk = createAsyncThunk('auth/student/subclass', async (arg) => {
    const { studentID } = arg;
    const response = await subclassService.getSubclassOfStudent(studentID);
    return response;
});

export const getAuthSubclassOfLecturerThunk = createAsyncThunk('auth/lecturer/subclass', async (arg) => {
    const { lecturerID } = arg;
    const response = await subclassService.getSubclassOfLecturer(lecturerID);
    return response;
});

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        phone: null,
        studentStatus: null,
        subclassOfStudent: null,
        subclassOfLecturer: null
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.phone = null;
            state.studentStatus = null;
            state.subclassOfStudent = null;
            state.subclassOfLecturer = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadUserThunk.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.data.info;
            })
            .addCase(getCurrentPersonPhoneThunk.fulfilled, (state, action) => {
                state.phone = action.payload.data.phoneNumber;
            })
            .addCase(getAuthStudentStatusThunk.fulfilled, (state, action) => {
                state.studentStatus = action.payload.data.statusOfStudent;
            })
            .addCase(getAuthSubclassOfStudentThunk.fulfilled, (state, action) => {
                state.subclassOfStudent = action.payload.data.subclassesOfStudent;
            })
            .addCase(getAuthSubclassOfLecturerThunk.fulfilled, (state, action) => {
                state.subclassOfLecturer = action.payload.data.subclassesOfLecturer;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;