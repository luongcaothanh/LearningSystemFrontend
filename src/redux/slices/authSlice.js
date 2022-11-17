import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import personService from "../../services/personService";

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
    }
    return response;
});

export const getCurrentPersonPhoneThunk = createAsyncThunk('auth/phone', async (arg) => {
    const { personID } = arg;
    const response = await personService.getPersonPhone(personID);
    return response;
});

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        phone: null
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
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
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;